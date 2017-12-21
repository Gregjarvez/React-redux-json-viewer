/* eslint-disable import/prefer-default-export */
import { checkJsonValidity } from './reducers/UTILS/util';
import constants from './constants';

export const inspectJson = store => next => (action) => {
  if (action.type === constants.PARSE_FIRST_LAYER) {
    const status = checkJsonValidity(store.getState().json);
    if (status.error) {
      return next({
        type: constants.PARSE_FAILED,
        payload: {
          error: status.error,
          errorMessage: status.errorMessage
        }
      });
    }
  }
  return next(action);
};
