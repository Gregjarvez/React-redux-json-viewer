import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { logger, inspectJson } from './middleware';

const middleware = applyMiddleware(thunk, inspectJson, logger);

const store = createStore(rootReducer, compose(
  middleware,
  typeof window === 'object' &&
  window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : void 0
));

export default store;

