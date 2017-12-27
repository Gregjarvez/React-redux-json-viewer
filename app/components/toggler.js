/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const Toggler = ({ meta, appendNodesToTree, removeNodesFromTree }) => {
  return (
    <span
      className={meta.isExpanded ? 'model--arrowdown' : 'model--arrowright'}
      onClick={() => (!meta.isExpanded ?
        appendNodesToTree(meta) :
        removeNodesFromTree(meta.id))
      }
    />
  );
};

Toggler.propTypes = {
  meta: PropTypes.object,
  appendNodesToTree: PropTypes.func,
  removeNodesFromTree: PropTypes.func
};


export default Toggler;
