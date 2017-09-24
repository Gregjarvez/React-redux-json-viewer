// eslint-disable
import test from '../testJson.json';
import array from '../testJsonArray.json';

const PathFinder = (function () {
  function getObjectWithid(tree, targetId) {
    return tree.find(node => node.meta.id === targetId);
  }

  function getRootId(tree) {
    return tree.find(node => node.meta.isRoot).meta.id;
  }

  function trace(tree, targetId) {

  }

  return {
    trace
  };
}());

PathFinder.trace(array, 'B1WG54VrjZ');
PathFinder.trace(test, 'S1Z5XAO4sW');

export default PathFinder;

