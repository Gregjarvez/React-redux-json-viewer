// eslint-disable
import test from '../testJson.json';
import array from '../testJsonArray.json';

const PathFinder = (function () {
  function getObjectWithid(tree, targetId) {
    return tree.find(node => node.meta.id === targetId);
  }

  function isChildOfId(tree, targetId) {
    return getObjectWithid(tree, targetId).meta.isChildof;
  }

  function getRootId(tree) {
    return tree.find(node => node.meta.isRoot).meta.id;
  }

  function isTargetRootsChild(tree, targetId) {
    return isChildOfId(tree, targetId) === getRootId(tree);
  }

  function getIndex(tree, targetId) {
    return tree.findIndex(node => node.meta.id === targetId);
  }

  function computeNodeNearRoot(relevantNodes) {
    let parent;


  }

  function composeDirectChildPath(relevantNodes) {
    const target = relevantNodes[relevantNodes.length - 1];
    const rootType = relevantNodes[0].meta.type;

    if (rootType === 'Object') {
      return `data.${target.Qey}`;
    }

    return `data[${target.Qey}]`;
  }

  function composeDeepPath(tree) {
    const targetParentNearRoot = computeNodeNearRoot(tree);
  }

  function trace(tree, targetId) {
    const targetIsChildOfRoot = isTargetRootsChild(tree, targetId);
    const relevantNodes = tree.slice(0, getIndex(tree, targetId) + 1);
    if (targetIsChildOfRoot) {
      return composeDirectChildPath(relevantNodes);
    }
    return composeDeepPath(relevantNodes);
  }

  return {
    trace
  };
}());

PathFinder.trace(array, 'B1WG54VrjZ');
PathFinder.trace(test, 'S1Z5XAO4sW');

export default PathFinder;

