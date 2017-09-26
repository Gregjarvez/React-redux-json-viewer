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
      case 'Object':
        return '%Ob%';
      default:
        return '';
    }
  }

  function path(template) {
    const object = new RegExp(/%Ob%/, 'g');
    return template.replace(object, '.');
  }

  function composePath(pathObject) {
    const steps = reducePath(pathObject);
    const delimiters = steps.map(node => node.type);
    // delimiters.pop(); // removes target delimiter
    const template = steps.reduce((cur, prev, index) => {
      const currentDelimiter = delimiters[((index - 1) + 1)];
      return cur
        .concat(`${!isNaN(+prev.key) ? `[${prev.key}]` : prev.key}${characters(currentDelimiter)}`);
    }, '');
    return path(template);
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

