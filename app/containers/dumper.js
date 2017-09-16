import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/json';
import 'brace/theme/textmate';

import Format from 'react-icons/lib/md/format-line-spacing';
import Parse from 'react-icons/lib/go/mirror';


const Dumper = (props) => {
  return (
    <div className="layout">
      <div className="layout--setting">
        <span className="layout--icongroup">
          <Format onClick={props.format} title="format" />
          <Parse onClick={props.startParse} title="Parse Json" />
        </span>
      </div>
      <div>
        <AceEditor
          mode="json"
          theme="textmate"
          name="dumper-editor"
          editorProps={{ $blockScrolling: true }}
          height="600px"
          focus
          tabsize={2}
          highlightActiveLine
          fontSize="13px"
          value={props.json}
          onChange={props.setJsonToControllerState}
          showPrintMargin={false}
          wrapEnabled
        />
      </div>
    </div>
  );
};

Dumper.propTypes = {
  setJsonToControllerState: PropTypes.func.isRequired,
  json: PropTypes.string,
  startParse: PropTypes.func.isRequired,
  format: PropTypes.func.isRequired
};

export default Dumper;
