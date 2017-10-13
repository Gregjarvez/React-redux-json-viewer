import constants from '../constants';
import { toJsonString } from './util';

const jsonReducer = (state = '', action) => {
  switch (action.type) {
    case constants.SET_JSON:
      return action.payload;
    case constants.FORMAT_JSON:
      if (state.length === 0) return state;
      return toJsonString(state, action.payload);
    default:
      return state;
  }
};

export default jsonReducer;
