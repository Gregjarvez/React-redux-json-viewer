import { combineReducers } from 'redux';
import jsonReducer from './json';
import treeReducer from './tree';
import errorReducer from './isError';
import tabWidthReducer from './tabWidth';
import modalReducer from './modal';

const rootReducer = combineReducers({
  json: jsonReducer,
  tree: treeReducer,
  parseFail: errorReducer,
  tabWidth: tabWidthReducer,
  modalState: modalReducer
});

export default rootReducer;

