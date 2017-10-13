import constants from '../constants';
import processJsonToViewable from './util';

const treeReducer = (state = [], action) => {
  switch (action.type) {
    case constants.PARSE_FIRST_LAYER:
      return processJsonToViewable(action.payload, true);
    case constants.RESET_TREE:
      return state;
    default:
      return state;
  }
};

export default treeReducer;
