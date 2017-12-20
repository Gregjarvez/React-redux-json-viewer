import { setJson } from './dumper_action';
import constants from '../constants';
import { getJson, fetchRequestedUrl, validUrl } from '../../parser/demo';

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


export const togglerModal = () => (
  {
    type: constants.TOGGLE_MODAL
  }
);

export const urlLoadFail = ({ message }) => (
  {
    type: constants.URL_ERROR_ONLOAD,
    payload: message
  }
);

export const loadUrl = (url) => {
  return (dispatch) => {
    if (validUrl(url)) {
      return fetchRequestedUrl(url)
        .then((json) => {
          dispatch(setJson(JSON.stringify(json, null, 2)));
          return Promise.resolve(null)
            .then(onlyAsyncActions => dispatch(togglerModal()));
        })
        .catch(err => dispatch(urlLoadFail(err)));
    }
    return dispatch(urlLoadFail({ message: 'Url is Invalid' }));
  };
};
