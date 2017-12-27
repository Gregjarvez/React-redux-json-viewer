import React from 'react';
import PropTypes from 'prop-types';

const Primitive = (props) => {
  return (
    <tr className="layout--row">
      <td className="model--panel">
        <span className="model--copy" role="img" aria-label="copy">
          &#128203;
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
              >{ props.value.toString() }
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
