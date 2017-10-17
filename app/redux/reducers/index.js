import { combineReducers } from 'redux';
import jsonReducer from './json';
import treeReducer from './tree';
import errorReducer from './isError';
import tabWidthReducer from './tabWidth';

const rootReducer = combineReducers({
  json: jsonReducer,
  tree: treeReducer,
  parseFail: errorReducer,
  tabWidth: tabWidthReducer
});

export default rootReducer;

