import constants from '../constants';

export const appendToTree = ({
  payload: load,
  id,
  mleft: margin,
  payloadIsParsed,
  insertionPoint,
  isChildOf
}) => (
  {
    type: constants.APPEND_TO_TREE,
    payload: {
      load,
      id,
      margin,
      payloadIsParsed,
      insertionPoint,
      isChildOf
    }
  }
);

export const removeFromNode = id => (
  {
    type: constants.APPEND_TO_TREE,
    payload: id
  }
);

export const collapseAll = () => (
  {
    type: constants.COLLAPSE_ALL
  }
);
