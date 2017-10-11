import { createStore } from 'redux';
import setJson from './reducers/dumper_reducer';

const INITIALSTATE = Object.freeze({
  json: ''
});

const store = createStore(setJson, INITIALSTATE);

export default store;

