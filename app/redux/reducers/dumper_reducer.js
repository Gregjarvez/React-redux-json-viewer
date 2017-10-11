import constants from '../constants';

function format(state, action) {
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

const jsonTextReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_JSON:
      return { ...state, json: action.payload };
    case constants.FORMAT_JSON:
      return format(state, action);
    default:
      return state;
  }
};

export default jsonTextReducer;
