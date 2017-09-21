/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ToggleDown from 'react-icons/lib/fa/angle-down';
import PropTypes from 'prop-types';


class Navigation extends React.Component {
  state = {
    isOpen: false
  }

  togglerDropDown = () => {
    return this.setState((prev) => {
      return {
        isOpen: !prev.isOpen
      };
    });
  }

  saveToLocalStorage = (json) => {
    if ('localStorage' in window && typeof json === 'string') {
      return localStorage.setItem('store', json);
    }
    return alert('local storage not supported by your current Browser');
  }
  render() {
    return (
      <ul className="navigation">
        <li className="navigation--logo">JSON Viewer Online</li>
        <li className="navigation--item" onClick={this.props.cleanSlate}>New</li>
        <li className="navigation--item" onClick={this.props.loadDemo}>Demo</li>
        <li
          className="navigation--item"
          onClick={this.togglerDropDown}
        >
          Settings
          <ToggleDown
            className="navigation--toggler"
          />
          <ul
            className={`navigation--options ${this.state.isOpen
              ? 'navigation--options-isOpened'
              : ' '}`}
            onMouseEnter={() => this.setState({ isOpen: true })}
            onMouseLeave={() => this.setState({ isOpen: false })}
          >
            <li>
              <span>Tab Size</span>
              <input
                type="number"
                max="5"
                min="1"
                step="1"
                className="navigation--tabsize"
                value={this.props.tabSize}
                onChange={e => this.props.tabSizeChange(e.target.value)}
              />
            </li>
            <li onClick={() => this.saveToLocalStorage(this.props.json)}>Save Json</li>
            <li onClick={() => this.props.openModal(true)}>Load URL</li>
            <li>Load localStorage</li>
          </ul>
        </li>
      </ul>
    );
  }
}

Navigation.propTypes = {
  loadDemo: PropTypes.func.isRequired,
  cleanSlate: PropTypes.func.isRequired,
  tabSizeChange: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  tabSize: PropTypes.number,
  json: PropTypes.string
};

export default Navigation;

