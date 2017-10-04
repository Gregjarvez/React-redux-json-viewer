import React from 'react';
import PropTypes from 'prop-types';
import Copy from 'react-icons/lib/md/note-add';
import { validUrl } from '../parser/demo';

const Primitive = (props) => {
  function linkify(string) {
    const url = new String(string);
    return validUrl(string) ? url.linkify() : string;
  }
  return (
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
              >{ linkify(props.value.toString()) }
              </td>
              <td>
                <table className="model--path">
                  <tbody>
                    <tr>
                      <td className="model--path-value">{ props.meta.path }</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};
Primitive.propTypes = {
  Qey: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  meta: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    margin: PropTypes.string,
    mleft: PropTypes.number,
    isChildof: PropTypes.array,
    path: PropTypes.any
  }).isRequired,
};
export default Primitive;
