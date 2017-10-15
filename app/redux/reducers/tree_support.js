import {
  parseJson,
  marginate,
  tagNodeAsCompleted,
  populateWithPath
} from './util';

const splice = Array.prototype.splice;

export const appendNodesToViewableTree = (state, payload) => {
  const {
    load, id, margin,
    payloadIsParsed,
    isChildOf } = payload;

  if (payload.length === 0) return state;

  let subtree;
  const refPoint = state.findIndex(node => node.meta.id === id);

  if (!payloadIsParsed) {
    subtree = parseJson(JSON.stringify(...load))
      .map(node => marginate(node, margin, isChildOf, id));

  } else {
    subtree = load;
  }


  // todo reopen previously opened objects or array

  const tree = [...state];
  splice.apply(tree, [refPoint + 1, 0, ...subtree]);

  const insertionNode = tree[refPoint];
  if (!insertionNode.meta.isExpanded) {
    tagNodeAsCompleted(insertionNode, subtree, refPoint);
  }
  return populateWithPath(tree);
};


export function removeNodesFromViewableTree(state, id) {
  const refPoint = state.findIndex(node => node.meta.id === id);

  const tree = [...state];
  splice.apply(tree, [refPoint + 1, tree[refPoint].meta.payload.length]);
  tree[refPoint].meta.isExpanded = false;

  return tree;
}
