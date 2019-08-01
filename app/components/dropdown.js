/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

const DropDown = ({
  isOpen,
  openModal,
  toggleDropDown,
  tabSizeChange,
  loadLocalStorage,
  saveJsonToLocalStorage,
  tabWidth,
}) => {
  return (
    <ul
      className={`navigation--options
       ${isOpen ? 'navigation--options-isOpened' : ''}`}
      onMouseLeave={toggleDropDown}
    >
      <li>
        <span>Tab Size</span>
        <input
          max="5"
          min="1"
          step="1"
          type="range"
          value={tabWidth}
          className="navigation--tabsize"
          onChange={({ target }) => tabSizeChange(+target.value)}
        />
      </li>
      <li onClick={saveJsonToLocalStorage}>Save Json</li>
      <li onClick={openModal}>Load URL</li>
      <li onClick={loadLocalStorage}>Load localStorage</li>
    </ul>
  );
};

DropDown.propTypes = {
  isOpen: PropTypes.bool,
  toggleDropDown: PropTypes.func,
  openModal: PropTypes.func,
  tabSizeChange: PropTypes.func,
  saveJsonToLocalStorage: PropTypes.func,
  tabWidth: PropTypes.number,
  loadLocalStorage: PropTypes.func,
};

export default DropDown;
