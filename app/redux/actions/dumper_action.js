import constants from '../constants/';

export const setJson = json => (
  {
    type: constants.SET_JSON,
    payload: json
  }
);

export const format = tabWidth => (
  {
    type: constants.FORMAT_JSON,
    payload: tabWidth
  }
);
