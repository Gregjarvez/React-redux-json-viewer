/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Toggler from './toggler';

const TypeObject = ({
  meta,
  appendNodesToTree,
  removeNodesFromTree,
  ...rest
}) => {
  const type = () =>
    meta.type === 'Object'
      ? `{ ${rest.contentCount} }`
      : `[ ${rest.contentCount} ]`;

  return (
    <tr className="layout--row">
      <td className="model--panel">
        <span className="model--copy" role="img" aria-label="copy">
          &#128203;
        </span>
      </td>
      <td className="model--key model--key-isObject">
        <table style={{ marginLeft: `${meta.mleft}px` }}>
          <tbody>
            <tr>
              <td>
                <Toggler
                  meta={meta}
                  appendNodesToTree={appendNodesToTree}
                  removeNodesFromTree={removeNodesFromTree}
                />
              </td>
              <td>{rest.Qey}</td>
              <td className="model--value model--value-object">{type()}</td>
              <td>
                <table className="model--path">
                  <tbody>
                    <tr>
                      <td className="model--path-value">{meta.path}</td>
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

TypeObject.propTypes = {
  meta: PropTypes.object,
  contentCount: PropTypes.string,
  Qey: PropTypes.string.isRequired,
  appendNodesToTree: PropTypes.func,
  removeNodesFromTree: PropTypes.func,
};

export default TypeObject;
