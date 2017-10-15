import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import { logger, inspectJson } from './middleware';

const middleware = applyMiddleware(inspectJson, logger);
// noinspection JSUnresolvedVariable
const store = createStore(rootReducer, compose(
  middleware,
  typeof window === 'object' &&
  window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : f => f
));

window.store = store;


export default store;

