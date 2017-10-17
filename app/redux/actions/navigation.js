import constants from '../constants';

export const setTabWidth = width => (
  {
    type: constants.SET_TAB_WIDTH,
    payload: width
  }
);

export const fnc = f => f;
