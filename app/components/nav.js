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

  render() {
    return (
      <ul className="navigation">
        <li className="navigation--logo">JSON Viewer Online</li>
        <li className="navigation--item" onClick={this.props.cleanSlate}>New</li>
        <li className="navigation--item" onClick={this.props.loadDemo}>Demo</li>
        <li className="navigation--item">Open
          <ToggleDown className="navigation--toggler" onClick={this.togglerDropDown} />
          <ul className={`navigation--options ${this.state.isOpen ? 'navigation--options-isOpened' : f => f}`}>
            <li>Load URL</li>
            <li>Load URL</li>
            <li>Load URL</li>
          </ul>
        </li>
        <li className="navigation--item">Settings <ToggleDown
          className="navigation--toggler"
        /></li>
      </ul>
    );
  }
}

Navigation.propTypes = {
  loadDemo: PropTypes.func.isRequired,
  cleanSlate: PropTypes.func.isRequired
};

export default Navigation;
