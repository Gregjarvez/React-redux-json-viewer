/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ToggleDown from 'react-icons/lib/fa/angle-down';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseSuccess, setJson } from '../redux/actions/dumper';
import { reset } from '../redux/actions/model';
import { setTabWidth, loadDemo, saveJsonToLocalStorage, togglerModal } from '../redux/actions/navigation';

class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  togglerDropDown = () => {
    return this.setState((prev) => {
      return {
        isOpen: !prev.isOpen
      };
    });
  };

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
              : ''}`}
            onMouseEnter={() => this.setState({ isOpen: true })}
            onMouseLeave={() => this.setState({ isOpen: false })}
          >
            <li>
              <span>Tab Size</span>
              <input
                type="range"
                max="5"
                min="1"
                step="1"
                className="navigation--tabsize"
                value={this.props.tabWidth}
                onChange={({ target }) => this.props.tabSizeChange(+target.value)}
              />
            </li>
            <li onClick={this.props.saveJsonToLocalStorage}>Save
              Json
            </li>
            <li onClick={() => this.props.openModal()}>Load URL</li>
            <li>Load
              localStorage
            </li>
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
  tabWidth: PropTypes.number,
  saveJsonToLocalStorage: PropTypes.func
};

const mapDispatchToProps = (dispatch) => {
  return {
    cleanSlate() {
      return Promise.all([
        dispatch(setJson('')),
        dispatch(reset()),
        dispatch(parseSuccess())
      ]);
    },
    tabSizeChange: width => dispatch(setTabWidth(width)),
    saveJsonToLocalStorage: () => dispatch(saveJsonToLocalStorage()),
    openModal: () => dispatch(togglerModal()),
    loadDemo: () => dispatch(loadDemo())
  };
};

const mapStateToProps = state => ({
  tabWidth: state.tabWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

