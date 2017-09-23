import shortid from 'shortid';
// import test from '../testJson.json';

// const data = JSON.stringify(test);

function ParserShell() {
  let instance;

  class Parser {
    constructor(json, headers) {
      this.json = json;
      this.headers = headers || false;
    }

    starter = () => {
      return JSON.parse(this.json) instanceof Array ? [] : {};
    };

    static size(value) {
      if (value === null) return 'null';
      return Object.keys(value).length;
    }

    static whatType(value) {
      const isPrimitive = [
        'number', 'string', 'boolean'
      ].includes(typeof value);
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
              isChildof: '',
              isRoot: false,
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
              payloadIsParsed: false,
              payload: [],
              insertionPoint: null,
              mleft: 38,
              isChildof: '',
              isRoot: false,
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

    header = (objectEntries) => {
      const baseInstance = this.starter();
      const type = Parser.determineInstance(baseInstance);

      return {
        Qey: type,
        contentCount: objectEntries.length,
        meta: {
          type,
          id: shortid.generate(),
          payloadIsParsed: true,
          mleft: 4,
          payload: [],
          isExpanded: true,
          insertionPoint: 0,
          isChildof: '',
          isRoot: true
        }
      };
    };

    static hasLength(value) {
      if (Parser.determineInstance(value) === 'Object') {
        return Parser.size(value);
      }
      return value.length;
    }


    traverse(objectEntries) {
      var model = []; // eslint-disable-line
      if (this.headers) {
        const start = this.header(objectEntries);
        model.push(start);
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
          if (Parser.hasLength(value) && value !== null) {
            build.meta.payload.push(value);
          }
          model.push(build);
        }
      }

      if (this.headers) {
        model = model.map((each, index) => {
          if (index !== 0) {
            each.meta.isChildof = model[0].meta.id;
            return each;
          }
          return each;
        });
        model[0].meta.payload.push(...model.slice(1));
      }


      return model;
    }
  }

  return {
    getInstance(json, header) {
      if (!instance) instance = new Parser(json, header);
      return instance;
    }
  };
}

export default ParserShell;
