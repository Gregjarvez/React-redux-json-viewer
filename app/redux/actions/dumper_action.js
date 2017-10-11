import constants from '../constants/';

const setJson = json => (
  {
    type: constants.SET_JSON,
    payload: json
  }
);

export default setJson;
