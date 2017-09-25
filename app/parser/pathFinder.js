// eslint-disable
import test from '../testJson.json';
import array from '../testJsonArray.json';

const PathFinder = (function () {
  const defaultVarName = 'data';

  function reducePath(pathObject) {
    return pathObject.map(node => ({
      type: node.meta.type,
      key: (node.meta.isRoot ? defaultVarName : node.Qey)
    }));
  }

  function characters(type) {
    switch (type) {
      case 'Array':
        return '%arr%';
      case 'Object':
        return '%Ob%';
      default:
        return '';
    }
  }
  function path(template) {
    const object = new RegExp(/%Ob%/, 'g');
    const array = new RegExp(/%arr%[0-9]/, 'g');

    return template.replace(object, '.')
      .replace(array, (match, charIndex, str) => {
        const index = str[charIndex + (match.length - 1)];
        const pos = `[${index}]`;
        return pos;
      });
  }

  function composePath(pathObject) {
    const steps = reducePath(pathObject);
    const delimiters = steps.map(node => node.type);
    delimiters.pop(); // removes target delimiter
    const template = steps.reduce((cur, prev, index) => {
      return cur.concat(`${prev.key}${characters(delimiters[((index - 1) + 1)])}`);
    }, '');
    console.log(path(template));
  }

  function trace(tree, targetId) {
    const targetNode = tree.find(node => node.meta.id === targetId);
    const targetNodeRelationsIds = targetNode.meta.isChildof;
    const relationsNodes = tree.filter(node => targetNodeRelationsIds.includes(node.meta.id));
    const includesTarget = [...relationsNodes, targetNode];
    return composePath(includesTarget);
  }

  return {
    trace
  };
}());


export default PathFinder;

