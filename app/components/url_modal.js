import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { togglerModal, loadUrl } from '../redux/actions/navigation';


class Modal extends React.Component {
  componentDidMount() {
    document.querySelector('.modal').addEventListener('click', (e) => {
      if (!e.target.classList.contains('modal')) {
        return !1;
      }
      return this.props.togglerModal();
    });
  }

  componentWillUnmount() {
    this.removeEventListener('click', f => f);
  }

  onInputSubmit = () => {
    this.props.loadUrl(this.textInput.value);
    this.textInput.value = '';
  }

  render() {
    const { modal_isOpened: opened, urlErrorMessage } = this.props.modalState;
    return (
      <div className={`modal ${opened ? 'modal--requested' : ''}`}>
        <div className="modal--container">
          <p className="modal--text">
            Enter a public url. Urls which need authentication
            or do not have CORS enabled cannot be loaded.
          </p>
          { urlErrorMessage.trim().length > 1 && <p className="modal--text-error">{urlErrorMessage}</p> }
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
  modalState: PropTypes.shape({
    modal_isOpened: PropTypes.bool,
    urlErrorMessage: PropTypes.string,
  }),
  togglerModal: PropTypes.func
};

const mapStateToProps = state => ({
  modalState: state.modalState,
});

const mapDispatchToProps = dispatch => ({
  togglerModal: () => dispatch(togglerModal()),
  loadUrl: url => dispatch(loadUrl(url))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
