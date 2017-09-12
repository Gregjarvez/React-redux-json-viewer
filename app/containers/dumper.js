/* eslint-disable no-unused-vars */

import React from 'react';
import AceEditor from 'react-ace';

import brace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';

import Format from 'react-icons/lib/md/format-line-spacing';

const Dumper = () => {
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
          focus={false}
          tabsize={2}
          highlightActiveLine={false}
          fontSize="15px"
        />
      </div>
    </div>
  );
};

export default Dumper;
