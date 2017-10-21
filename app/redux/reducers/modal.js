import constants from '../constants';

const modalReducer = (state = {
  modal_isOpened: false,
  urlErrorMessage: ''
}, action) => {
  switch (action.type) {
    case constants.TOGGLE_MODAL:
      return {
        ...state,
        modal_isOpened: !state.modal_isOpened,
      };
    case constants.URL_ERROR_ONLOAD:
      return {
        ...state,
        modal_isOpened: true,
        urlErrorMessage: action.payload
      };
    default:
      return state;
  }
};

export default modalReducer;
