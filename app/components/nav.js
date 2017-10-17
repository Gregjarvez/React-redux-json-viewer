/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ToggleDown from 'react-icons/lib/fa/angle-down';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setJson, parseSuccess } from '../redux/actions/dumper_action';
import { reset } from '../redux/actions/model_actions';
import { setTabWidth } from '../redux/actions/navigation';

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

  saveToLocalStorage = (json) => {
    if ('localStorage' in window && typeof json === 'string') {
      return localStorage.setItem('store', json || JSON.stringify(
        { data: null }, null, 2));
    }
    return alert('local storage not supported by your current Browser');
  };

  render() {
    console.log(this.state.isOpen);
    return (
      <ul className="navigation">
        <li className="navigation--logo">JSON Viewer Online</li>
        <li className="navigation--item" onClick={this.props.cleanSlate}>New
        </li>
        <li className="navigation--item" onClick={this.props.loadDemo}>Demo
        </li>
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
                type="range"
                max="5"
                min="1"
                step="1"
                className="navigation--tabsize"
                value={this.props.tabWidth}
                onChange={(e) => {
                  this.props.tabSizeChange(+e.target.value);
                }}
              />
            </li>
            <li onClick={() => this.saveToLocalStorage(this.props.json)}>Save
              Json
            </li>
            <li onClick={() => this.props.openModal(true)}>Load URL</li>
            <li onClick={() => this.props.loadLocalStorage()}>Load
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
  loadLocalStorage: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  tabWidth: PropTypes.number,
  json: PropTypes.string
};


const mapDispatchToProps = (dispatch) => {
  return {
    cleanSlate() {
      Promise.all([
        dispatch(setJson('')),
        dispatch(reset()),
        dispatch(parseSuccess())
      ])
        .then((voidResults) => { voidResults = null; });
    },
    tabSizeChange(width) {
      dispatch(setTabWidth(width));
    }
  };
};

const mapStateToProps = state => ({
  tabWidth: state.tabWidth
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);

