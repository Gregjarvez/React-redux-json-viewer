import constants from '../constants';

const modalReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.TOGGLE_MODAL:
      return {
        ...state,
        modal_isVisible: !state.modal_isVisible
      };
    default:
      return state;
  }
};

export default modalReducer;
