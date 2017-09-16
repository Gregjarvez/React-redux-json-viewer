import shortid from 'shortid';

function ParserShell() {
  let instance;

  class Parser {
    constructor(json) {
      this.json = json;
    }

    starter = () => {
      return JSON.parse(this.json) instanceof Array ? [] : {};
    };

    static size(value) {
      if (value === null) return 'null';
      return Object.keys(value).length;
    }

    static whatType(value) {
      const isPrimitive = ['number', 'string', 'boolean'].includes(
        typeof value);
      return isPrimitive ? 'primitive' : 'object';
    }

    static converter(json) {
      return JSON.parse(json);
    }

    static determineInstance(value) {
      return value instanceof Array ? 'Array' : 'Object';
    }

    static nodeType(type, iteratee) {
      const types = {
        primitive(iteratee) {
          const [key, value] = iteratee;

          return {
            Qey: key,
            value,
            meta: {
              type: typeof value,
              id: shortid.generate(),
              mleft: 38,
              isChildof: ''
            }
          };
        },

        object(iteratee) {
          const [key, value] = iteratee;
          const type = Parser.determineInstance(value);

          return {
            Qey: key,
            contentCount: type === 'Array' ? value.length : Parser.size(value),
            meta: {
              type,
              isExpandable: !!(
                type === 'Array' ? value.length : Parser.size(value)
              ),
              isExpanded: false,
              id: shortid.generate(),
              payload: [],
              mleft: 38,
              isChildof: ''
            }
          };
        }
      };
      return types[type](iteratee);
    }

    static toObjectEntries(parsedJson) {
      return Object.entries(parsedJson);
    }

    compose2(fn1, fn2) {
      return function (value) {
        return fn2(fn1(value));
      };
    }

    buildAbstractTree = () => {
      const raw = this.compose2(Parser.converter, Parser.toObjectEntries);
      const structure = raw(this.json);
      const tree = this.traverse(structure);
      return tree;
    };

    traverse(objectEntries) {
      const model = [];

      const buildStart = () => {
        const baseInstance = this.starter();

        return {
          Qey: Parser.determineInstance(baseInstance),
          contentCount: objectEntries.length,
          meta: {
            type: Parser.determineInstance(baseInstance),
            payload: []
          }
        };
      };

      const start = buildStart();// eslint-disable-line no-use-before-define
      model.push(start);

      function hasLength(value) {
        if (Parser.determineInstance(value) === 'Object') {
          return Parser.size(value);
        }
        return value.length;
      }

      for (let i = 0; i < objectEntries.length; i += 1) {
        if (objectEntries.length === 0) break;
        const processing = objectEntries[i];
        const [, value] = processing;
        const whatType = Parser.whatType(value);

        if (whatType === 'primitive') {
          const build = Parser.nodeType('primitive', processing);
          model.push(build);
        }

        if (whatType === 'object') {
          const build = Parser.nodeType('object', processing);
          if (hasLength(value)) {
            if (value !== null) {
              build.meta.payload.push(value);
            }
          }
          model.push(build);
        }
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
