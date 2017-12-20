import React from 'react';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'brace/mode/json';
import 'brace/theme/textmate';

import Format from 'react-icons/lib/md/format-line-spacing';
import Parse from 'react-icons/lib/go/mirror';
import {
  format,
  parseLayer,
  parseSuccess,
  setJson
} from '../redux/actions/dumper_action';

const Dumper = (props) => {
  function determineAction() {
    Promise.all([
      props.success(),
      props.parseJson(props.json)
    ]).then((results) => { results = null; });
  }

  return (
    <div className="layout">
      <div className="layout--setting">
        <span className="layout--icongroup">
          <Format onClick={() => props.format(props.tab)} title="format" />
          <Parse
            onClick={() => determineAction()}
            title="Parse Json"
          />
        </span>
      </div>
      <div>
        <AceEditor
          width="99%"
          height="600px"
          fontSize="13px"
          mode="json"
          theme="textmate"
          name="dumper-editor"
          value={props.json}
          editorProps={{ $blockScrolling: true }}
          onChange={props.setJsonToControllerStore}
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
  success: PropTypes.func,
  setJsonToControllerStore: PropTypes.func.isRequired,
  parseJson: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired,
  tab: PropTypes.number
};

const mapStateToProps = state => (
  {
    json: state.json,
    parseFail: state.parseFail,
    tab: state.tabWidth
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setJsonToControllerStore(json) {
      dispatch(setJson(json));
    },
    format(tabWidth) {
      dispatch(format(tabWidth));
    },
    parseJson(json) {
      dispatch(parseLayer(json));
    },
    success() {
      dispatch(parseSuccess());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dumper);
