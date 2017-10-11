import React from 'react';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/json';
import 'brace/theme/textmate';

import Format from 'react-icons/lib/md/format-line-spacing';
import Parse from 'react-icons/lib/go/mirror';

import { setJson, format } from '../redux/actions/dumper_action';

const Dumper = (props) => {
  return (
    <div className="layout">
      <div className="layout--setting">
        <span className="layout--icongroup">
          <Format onClick={() => props.format(props.tabWidth)} title="format" />
          <Parse onClick={props.startParse} title="Parse Json" />
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
          editorProps={{ $blockScrolling: true }}
          tabsize={props.tabWidth}
          value={props.json}
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
  tabWidth: PropTypes.number,
  setJsonToControllerStore: PropTypes.func.isRequired,
  startParse: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired
};

const mapStateToProps = state => (
  {
    json: state.json,
    tabWidth: state.tabWidth
  }
);

const mapDispatchToProps = (dispatch) => {
  return {
    setJsonToControllerStore(json) {
      dispatch(setJson(json));
    },
    format(tabWidth) {
      dispatch(format(tabWidth));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dumper);
