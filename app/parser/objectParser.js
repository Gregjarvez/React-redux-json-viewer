/* eslint-disable */
import shortid from 'shortid';
const is = Object.is

const ParserShell = (function ParseShell() {

  class Parser {
    constructor(json, headers) {
      this.json = json;
      this.headers = headers || false;
    }

    static size(value) {
      return is(value, null) ? 'null' :  Object.keys(value).length;
    }

    static dataType(value) {
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

    static nodeTypeBase(type) {
      return {
        type,
        id: shortid.generate(),
        mleft: 38,
        isChildof: [],
        isRoot: false,
        path: ''
      };
    }

    static nodeType(type, iteratee) {
      const types = {
        primitive(iteratee) {
          const [key, value] = iteratee;

          return {
            Qey: key,
            value,
            meta: Parser.nodeTypeBase(typeof value)
          };
        },

        object(iteratee) {
          const [key, value] = iteratee;
          const type = Parser.determineInstance(value);
          const content = type === 'Array' ? value.length : Parser.size(value);

          return {
            Qey: key,
            contentCount: content.toString(),
            meta: Object.assign(Parser.nodeTypeBase(type), {
              isExpandable: !!content,
              isExpanded: false,
              payloadIsParsed: false,
              payload: [],
              insertionPoint: null,
            })
          };
        }
      };
      return types[type](iteratee);
    }

    static toObjectEntries(parsedJson) {
      return Object.entries(parsedJson);
    }

    compose(fn1, fn2) {
      return function (value) {
        return fn2(fn1(value));
      };
    }

    buildAbstractTree = () => {
      const raw = this.compose(Parser.converter, Parser.toObjectEntries);
      return this.traverse(raw(this.json));
    };

    header = (objectEntries) => {
      const baseInstance = JSON.parse(this.json) instanceof Array ? [] : {};
      const type = Parser.determineInstance(baseInstance);

      return {
        Qey: type,
        contentCount: objectEntries.length.toString(),
        meta: Object.assign(Parser.nodeTypeBase(type), {
          mleft: 4,
          payloadIsParsed: true,
          payload: [],
          isExpanded: true,
          isRoot: true,
          path: ''
        })
      };
    };

    static hasLength(value) {
      return Parser.determineInstance(value) === 'Object' ?
                Parser.size(value) : value.length
    }

    traverse(objectEntries) {
      let model = [];
      const headers = this.headers && model.push(this.header(objectEntries));


      for (let i = 0; i < objectEntries.length; i += 1) {

        if (objectEntries.length === 0) {
          break;
        }

        const bluePrint = objectEntries[i];
        const [, value] = bluePrint;
        const type = Parser.dataType(value);

        if (type === 'primitive') {
          model.push(Parser.nodeType('primitive', bluePrint));
        }

        if (type === 'object') {
          const build = Parser.nodeType('object', bluePrint);

          if (Parser.hasLength(value) && value !== null) {
            build.meta.payload.push(value);
          }

          model.push(build);
        }
      }

      if (headers) {
        model = model.map((each, index) => {
          (index !== 0) && each.meta.isChildof.push(model[0].meta.id);
          return each;
        });
        model[0].meta.payload.push(...model.slice(1));
      }
      return model;
    }
  }

  return {
    getInstance(json, header) {
      return new Parser(json, header);
    }
  };
}());

export default ParserShell;
