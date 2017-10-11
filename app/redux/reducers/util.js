import Parser from '../../parser/objectParser';
import PathFinder from '../../parser/pathFinder';

export function parseJson(array, headers) {
  return Parser.getInstance(array, headers).buildAbstractTree();
}

export function checkJsonValidity(json) {
  try {
    JSON.parse(json);
    return 'isValid';
  } catch (error) {
    return error;
  }
}

export function populateWithPath(tree) {
  return tree.map((node) => {
    node.meta.path = PathFinder.trace(tree, node.meta.id);
    return node;
  });
}

function processJsonToViewable(value, meta = false) {
  return populateWithPath(parseJson(value, meta));
}

export default processJsonToViewable;
