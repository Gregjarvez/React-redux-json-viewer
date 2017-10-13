import constants from '../constants';

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

export const parseLayer = json => (
  {
    type: constants.PARSE_FIRST_LAYER,
    payload: json
  }
);

export const parseSuccess = () => (
  {
    type: constants.PARSE_SUCCESS,
  }
);

export const resetTree = json => (
  {
    type: constants.RESET_TREE,
  }
);
