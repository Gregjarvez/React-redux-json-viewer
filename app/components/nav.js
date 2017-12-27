/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parseSuccess, setJson } from '../redux/actions/dumper';
import { reset } from '../redux/actions/model';
import DropDown from './dropdown';
import {
  setTabWidth, loadDemo,
  saveJsonToLocalStorage, togglerModal,
  loadLocalStorage } from '../redux/actions/navigation';

class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  toggleDropDown = () => {
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
          onClick={this.toggleDropDown}
        >
          Settings
          <DropDown
            isOpen={this.state.isOpen}
            toggleDropDown={this.toggleDropDown}
            {...this.props}
          />
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
    loadDemo: () => dispatch(loadDemo()),
    loadLocalStorage: () => dispatch(loadLocalStorage())
  };
};

const mapStateToProps = state => ({
  tabWidth: state.tabWidth,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

