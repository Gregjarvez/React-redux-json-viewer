import constants from '../constants';

const setJson = (state = {}, action) => {
  switch (action.type) {
    case constants.SET_JSON:
      return { ...state, json: action.payload };
    default:
      return state;
  }
};

export default setJson;
