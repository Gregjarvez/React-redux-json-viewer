// eslint-disable
import test from '../testJson.json';

const PathFinder = (function () {
  function getObjectWithid(tree, targetId) {
    return tree.find(node => node.meta.id === targetId);
  }

  function getChildTagId(tree, targetId) {
    return getObjectWithid(tree, targetId).meta.isChildof;
  }

  function getRootId(tree) {
    return tree.find(node => node.meta.isRoot).id;
  }

  function isTargetRootsChild(tree, targetId) {
    return getChildTagId(tree, targetId) === getRootId(tree);
  }

  function trace(tree, targetId) {
    const targetPosition = isTargetRootsChild(tree, targetId);
    console.log(targetPosition);
  }

  return {
    trace
  };
}());

PathFinder.trace(test, 'SyeqQCd4iW');

export default PathFinder;

