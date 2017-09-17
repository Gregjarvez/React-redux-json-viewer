import React from 'react';
import ToggleDown from 'react-icons/lib/fa/angle-down';


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
        <li className="navigation--item">New</li>
        <li className="navigation--item">Save</li>
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
export default Navigation;
