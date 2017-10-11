import { createStore } from 'redux';
import jsonTextReducer from './reducers/dumper_reducer';

const INITIALSTATE = Object.freeze({
  json: '',
  tree: [],
  isError: false,
  errorMessage: '',
  tabWidth: 2,
});

const store = createStore(jsonTextReducer, INITIALSTATE);

export default store;

