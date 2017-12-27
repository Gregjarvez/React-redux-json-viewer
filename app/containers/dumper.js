import React from 'react';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'brace/mode/json';
import 'brace/theme/textmate';
import {
  format, parseLayer, parseSuccess,
  setJson,
} from '../redux/actions/dumper';

const Dumper = ({
  json, tab,
  format,
  parseJson,
  setJsonToControllerStore,
}) => {
  function determineAction() {
    return Promise.all([
      parseJson(json),
    ]);
  }

  return (
    <div className="layout">
      <div className="layout--setting">
        <button className="layout--text" onClick={() => format(tab)}>
            Format
        </button>
        <button className="layout--text" onClick={() => determineAction()}>
            Process
        </button>
      </div>
      <div>
        <AceEditor
          width="99%"
          height="600px"
          fontSize="13px"
          mode="json"
          theme="textmate"
          name="dumper-editor"
          value={json}
          onChange={setJsonToControllerStore}
          showPrintMargin={false}
          focus
          wrapEnabled
          highlightActiveLine
        />
      </div>
    </div>
  );
};

Dumper.propTypes = {
  json: PropTypes.string,
  setJsonToControllerStore: PropTypes.func.isRequired,
  parseJson: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  tab: PropTypes.number,
};

const mapStateToProps = state => (
  {
    json: state.json,
    parseFail: state.parseFail,
    tab: state.tabWidth,
  }
);

const mapDispatchToProps = dispatch => (
  {
    setJsonToControllerStore: json => dispatch(setJson(json)),
    format: tabWidth => dispatch(format(tabWidth)),
    parseJson: json => dispatch(parseLayer(json)),
    success: () => dispatch(parseSuccess()),
  }
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dumper);
