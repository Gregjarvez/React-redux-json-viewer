import { checkJsonValidity } from './reducers/util';
import constants from './constants';

export const inspectJson = store => next => (action) => {
  if (action.type === constants.PARSE_FIRST_LAYER) {
    const maybeError = checkJsonValidity(store.getState().json);
    if (maybeError.error) {
      const debouncedAction = {
        type: constants.PARSE_FAILED,
        payload: {
          error: maybeError.error,
          errorMessage: maybeError.errorMessage
        }
      };
      return next(debouncedAction);
    }
  }
  return next(action);
};

export const logger = store => next => (action) => {
  console.group('store');
  console.log(store.getState());
  console.log(action);
  console.groupEnd('store');
  next(action);
};
