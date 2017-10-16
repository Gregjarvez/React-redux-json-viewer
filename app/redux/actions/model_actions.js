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

export const collapseAll = () => (
  {
    type: constants.COLLAPSE_ALL
  }
);
