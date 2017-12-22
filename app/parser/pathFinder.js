/* eslint-disable */
const PathFinder = (function PathFinder() {
  const defaultVarName = 'data';

  function reducePath(pathObject) {
    return pathObject.map(node => ({
      type: node.meta.type,
      key: (node.meta.isRoot ? defaultVarName : node.Qey)
    }));
  }

  function characters(type) {
    return type === 'Object' ? '%Ob%' : '';
  }

  function path(template) {
    return template.replace(/%Ob%/g, '.');
  }

  function composePath(pathObject) {
    const steps = reducePath(pathObject);
    const delimiters = steps.map(node => node.type);
    delimiters.pop(); // removes target delimiter

    const template = steps.reduce((cur, prev, index) => {
      const currentDelimiter = delimiters[((index - 1) + 1)];
      const symbol = `${!isNaN(+prev.key) ? `[${prev.key}]` : prev.key}`;
      const separator = characters(currentDelimiter);

      return cur.concat(symbol, separator);
    }, '');
    return path(template);
  }

  function trace(tree, targetId) {
    const targetNode = tree.find(node => node.meta.id === targetId);
    const {isChildof: parents} = targetNode.meta;

    const includesTarget = [
      ...tree.filter(node => parents.includes(node.meta.id)),
      targetNode
    ];
    return composePath(includesTarget);
  }

  return {
    trace
  };
}());


export default PathFinder;

