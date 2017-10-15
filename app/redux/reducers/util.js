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

export function marginate(each, margin, childof, id) {
  each.meta.mleft = margin + 20;
  each.meta.isChildof.push(id, ...childof);
  return each;
}

export function tagNodeAsCompleted(node, subtree, insertionPoint) {
  node.meta.isExpanded = true;
  node.meta.payload = subtree;
  node.meta.payloadIsParsed = true;
  node.meta.insertionPoint = insertionPoint;
}

export default function processJsonToViewable(value, meta = false) {
  return populateWithPath(parseJson(value, meta));
}

