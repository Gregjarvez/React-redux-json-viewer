import constants from '../constants';
import processJsonToViewable, { checkJsonValidity } from './util';

function format(state = {}, action) {
  if (state.json.length === 0) return !1;
  return {
    ...state,
    json: JSON.stringify(
      JSON.parse(state.json),
      null,
      action.payload
    )
  };
}

function parseLayer(state = {}) {
  const verify = checkJsonValidity(state.json);
  if (verify === 'isValid') {
    return {
      ...state,
      tree: processJsonToViewable(state.json, true),
      isError: false,
      errorMessage: ''
    };
  }
  return {
    ...state,
    tree: [],
    isError: true,
    errorMessage: verify.message
  };
}

const jsonTextReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_JSON:
      return { ...state, json: action.payload };
    case constants.FORMAT_JSON:
      return format(state, action);
    case constants.PARSE_FIRST_LAYER:
      return parseLayer(state, action);
    default:
      return state;
  }
};

export default jsonTextReducer;
