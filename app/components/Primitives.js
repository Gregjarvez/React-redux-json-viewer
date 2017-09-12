import React from 'react';
import { string, shape } from 'prop-types';
import Copy from 'react-icons/lib/md/note-add';

const Primitive = props => (
  <tr className="layout--row">
    <td className="model--panel">
      <span className="model--copy" title="copy path to key">
        <Copy />
      </span>
    </td>
    <td className="model--key">
      <table style={{ marginLeft: props.meta.margin }}>
        <tbody>
          <tr className="layout--row">
            <td className="model--key">{ props.Qey }</td>
            <td>:</td>
            <td className={`model--value ${props.meta.type === 'string'
              ? 'model--value-string'
              : 'model--value-number'}`}
            >{ props.value }
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);


Primitive.propTypes = {
  Qey: string.isRequired,
  value: string.isRequired,
  meta: shape({
    type: string,
    margin: string,
  }).isRequired,

};
export default Primitive;
