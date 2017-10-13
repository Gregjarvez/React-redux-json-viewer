import Parser from '../../parser/objectParser';
import PathFinder from '../../parser/pathFinder';

export function parseJson(array, headers) {
  return Parser.getInstance(array, headers).buildAbstractTree();
}

export function checkJsonValidity(json) {
  try {
    JSON.parse(json);
    return {
      error: false,
      errorMessage: ''
    };
  } catch (error) {
    return {
      error: true,
      errorMessage: error.message
    };
  }
}

export function populateWithPath(tree) {
  return tree.map((node) => {
    node.meta.path = PathFinder.trace(tree, node.meta.id);
    return node;
  });
}

export function toJsonString(json, width) {
  const stringify = JSON.stringify(
    JSON.parse(json),
    null,
    width
  );
  console.log(stringify);
  return stringify;
}

function processJsonToViewable(value, meta = false) {
  return populateWithPath(parseJson(value, meta));
}

export default processJsonToViewable;
