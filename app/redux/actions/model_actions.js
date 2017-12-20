import constants from '../constants';

export const appendToTree = ({
  payload: load,
  id,
  mleft: margin,
  payloadIsParsed,
  insertionPoint,
  isChildof
}) => (
  {
    type: constants.APPEND_TO_TREE,
    payload: {
      load,
      id,
      margin,
      payloadIsParsed,
      insertionPoint,
      isChildof
    }
  }
);

export const removeFromNode = id => (
  {
    type: constants.REMOVE_FROM_TREE,
    payload: id
  }
);

export const collapseAll = json => (
  {
    type: constants.COLLAPSE_ALL,
    payload: json
  }
);

export const reset = () => (
  {
    type: constants.RESET_TREE,
  }
);

