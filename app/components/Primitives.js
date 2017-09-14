import React from 'react';
import PropTypes from 'prop-types';
import Copy from 'react-icons/lib/md/note-add';

const Primitive = props => (
  <tr className="layout--row">
    <td className="model--panel">
      <span className="model--copy" title="copy path to key">
        <Copy />
      </span>
    </td>
    <td className="model--key">
      <table style={{ marginLeft: `${props.meta.mleft}px` }}>
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
  Qey: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  meta: PropTypes.shape({
    type: PropTypes.string,
    margin: PropTypes.string,
    mleft: PropTypes.string
  }).isRequired,

};
export default Primitive;
