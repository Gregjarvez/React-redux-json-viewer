import { setJson } from './dumper_action';
import constants from '../constants';
import { getJson } from '../../parser/demo';

export const setTabWidth = width => (
  {
    type: constants.SET_TAB_WIDTH,
    payload: width
  }
);


export const loadDemo = () => {
  return (dispatch) => {
    getJson()
      .then(data => dispatch(setJson(JSON.stringify(data, null, 2))));
  };
};

export const saveJsonToLocalStorage = () => {
  return {
    type: constants.SAVE_TO_LOCALSTORAGE,
  };
};

export const loadLocalStorage = () => {
  return (dispatch) => {
    const json = localStorage.getItem('json') ||
                 JSON.stringify({ data: { message: 'No item found in localStorage' } });
    return dispatch(setJson(json));
  };
};
