/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  componentDidMount() {
    document.querySelector('.modal').addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.props.closeModal(false);
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('click', f => f);
  }

  onInputSubmit = () => {
    this.props.loadUrl(this.textInput.value);
    this.textInput.value = '';
  }

  render() {
    return (
      <div
        className={`modal ${this.props.modalIsRequested ? 'modal--requested' : ''}`}
      >
        <div className="modal--container">
          <p className="modal--text">
            Enter a public url. Urls which need authentication
            or do not have CORS enabled cannot be loaded.
          </p>
          {
            this.props.urlError.trim().length > 1 &&
            <p className="modal--text-error">{this.props.urlError}</p>
          }
          <div className="modal--input">
            <input type="text" ref={(input) => { this.textInput = input; }} />
            <button onClick={this.onInputSubmit}>GO</button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  loadUrl: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  modalIsRequested: PropTypes.bool,
  urlError: PropTypes.string
};

export default Modal;
