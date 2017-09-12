import React from 'react';
import AceEditor from 'react-ace';
import PropTypes from 'prop-types';

import brace from 'brace'; // eslint-disable-line no-unused-vars
import 'brace/mode/json';
import 'brace/theme/github';

import Format from 'react-icons/lib/md/format-line-spacing';

const Dumper = (props) => {
  return (
    <div className="layout">
      <div className="layout--setting">
        <span title="format"><Format /></span>
      </div>
      <div className="layout--embedded">
        <AceEditor
          mode="json"
          theme="github"
          name="dumper-editor"
          editorProps={{ $blockScrolling: true }}
          height="600px"
          focus
          tabsize={2}
          highlightActiveLine={false}
          fontSize="15px"
          onChange={props.setJsonToControllerState}
        />
      </div>
    </div>
  );
};

Dumper.propTypes = {
  setJsonToControllerState: PropTypes.func.isRequired,
};

export default Dumper;
