import { combineReducers } from 'redux';
import jsonReducer from './json';
import treeReducer from './tree';
import errorReducer from './isError';

const rootReducer = combineReducers({
  json: jsonReducer,
  tree: treeReducer,
  parseFail: errorReducer
});

export default rootReducer;

