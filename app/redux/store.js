import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { logger, inspectJson, resetMiddleWare } from './middleware';

const middleware = applyMiddleware(inspectJson, resetMiddleWare, logger);
const store = createStore(rootReducer, middleware);

window.store = store;


export default store;

