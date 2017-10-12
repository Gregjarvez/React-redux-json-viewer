import constants from '../constants';
import dumperReducer from './dumper_reducer';
import modalReducer from './modal_reducer';

const INITIALSTATE = Object.freeze({
  json: '',
  tree: [],
  isError: false,
  errorMessage: '',
  tabWidth: 2,
});

const rootReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case constants.SET_JSON:
      return dumperReducer(state, action);
    case constants.FORMAT_JSON:
      return dumperReducer(state, action);
    case constants.PARSE_FIRST_LAYER:
      return dumperReducer(state, action);
    case constants.TOGGLE_MODAL:
      return modalReducer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
