import { size } from 'lodash';
import shortid from 'shortid';
// import test from '../testJson.json';

function ParserShell() {
  let instance;

  class Parser {
    constructor(json) {
      this.json = json;
    }

    starter = () => {
      return JSON.parse(this.json) instanceof Array ? [] : {};
    };

    static whatType(value) {
      const isPrimitive = ['number', 'string', 'boolean'].includes(
        typeof value);
      return isPrimitive ? 'primitive' : 'object';
    }

    static converter(json) {
      try {
        return JSON.parse(json);
      } catch (error) {
        return error;
      }
    }

    static determineInstance(value) {
      return value instanceof Array ? 'Array' : 'Object';
    }

    static treeInstance(typeAction, iteratee) {
      const maker = {
        primitive(iteratee) {
          const [key, value] = iteratee;

          return {
            Qey: key,
            value,
            meta: {
              type: typeof value,
              id: shortid.generate(),
              mleft: 16
            }
          };
        },

        object(iteratee) {
          const [key, value] = iteratee;
          const type = Parser.determineInstance(value);

          return {
            type: key,
            contentCount: type === 'Array' ? value.length : size(value),
            meta: {
              type,
              isExpandable: !!(
                type === 'Array' ? value.length : size(value)
              ),
              expanded: false,
              id: shortid.generate(),
              payload: [],
              mleft: 16
            }
          };
        }
      };
      return maker[typeAction](iteratee);
    }

    static toObjectEntries(parsedJson) {
      return Object.entries(parsedJson);
    }

    static compose2(fn1, fn2) {
      return function (value) {
        return fn2(fn1(value));
      };
    }

    static placeHolder(value) {
      return Parser.determineInstance(value) === 'Object' ? '{ 0 }' : '[ 0 ]';
    }

    buildAbstractTree = () => {
      const raw = Parser.compose2(Parser.converter, Parser.toObjectEntries);
      const toTraverse = raw(this.json);
      const structure = this.traverse(toTraverse);
      return structure;
    };

    traverse(objectEntries) {
      const context = this;
      const model = [];
      const starter = buildStart();// eslint-disable-line no-use-before-define
      model.push(starter);

      buildTree(objectEntries); // eslint-disable-line no-use-before-define

      function buildStart() {
        const baseInstance = context.starter();

        return {
          type: Parser.determineInstance(baseInstance),
          contentCount: objectEntries.length,
          meta: {
            type: Parser.determineInstance(baseInstance),
            payload: [],
          }
        };
      }

      function hasLength(value) {
        if (Parser.determineInstance(value) === 'Object') return size(value);
        return value.length;
      }

      function buildTree(objectEntries) {
        if (objectEntries.length === 0) return false;

        const [processing, ...rest] = objectEntries;
        const [, value] = processing;
        const whatType = Parser.whatType(value);

        if (whatType === 'primitive') {
          const build = Parser.treeInstance('primitive', processing);
          model.push(build);
        }

        if (whatType === 'object') {
          const build = Parser.treeInstance('object', processing);
          if (hasLength(value)) {
            build.meta.payload.push(value);
          } else {
            build.meta.payload.push(Parser.placeHolder(value));
          }
          model.push(build);
        }
        return buildTree(rest);
      }
      return model;
    }
  }

  return {
    getInstance(json) {
      if (!instance) instance = new Parser(json);
      return instance;
    }
  };
}

export default ParserShell;
