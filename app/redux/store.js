import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { logger, inspectJson } from './middleware';

const middleware = applyMiddleware(logger, inspectJson);
const store = createStore(rootReducer, middleware);

window.store = store;


export default store;

