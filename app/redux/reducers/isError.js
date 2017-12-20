import constants from '../constants';

const errorReducer = (state = {
  error: false,
  errorMessage: ''
}, action) => {
  switch (action.type) {
    case constants.PARSE_FAILED:
      return {
        ...state,
        error: action.payload.error,
        errorMessage: action.payload.errorMessage
      };
    case constants.PARSE_SUCCESS:
      return state 
    default:
      return state;
  }
};

export default errorReducer;
