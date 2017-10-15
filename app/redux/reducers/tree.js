import constants from '../constants';
import processJsonToViewable, { populateWithPath } from './util';
import { appendNodesToViewableTree, removeNodesFromViewableTree } from './tree_support';

const treeReducer = (state = [], action) => {
  switch (action.type) {
    case constants.PARSE_FIRST_LAYER:
      return processJsonToViewable(action.payload, true);
    case constants.APPEND_TO_TREE:
      return appendNodesToViewableTree(state, action.payload);
    case constants.REMOVE_FROM_TREE:
      return removeNodesFromViewableTree(state, action.payload);
    case constants.RESET_TREE:
      return [];
    default:
      return state;
  }
};

export default treeReducer;
