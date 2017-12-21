import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import { inspectJson } from './middleware';

const middleware = applyMiddleware(thunk, inspectJson);

const store = createStore(rootReducer, compose(
  middleware,
  typeof window === 'object' &&
  window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : null
));

export default store;

