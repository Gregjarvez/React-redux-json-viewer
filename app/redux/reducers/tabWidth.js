import constants from '../constants';

const tabWidthReducer = (state = 2, action) => {
  switch (action.type) {
    case constants.SET_TAB_WIDTH:
      return action.payload;
    default:
      return state;
  }
};

export default tabWidthReducer;
