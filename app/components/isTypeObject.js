import React from 'react';
import PropTypes from 'prop-types';
import ToggleDown from 'react-icons/lib/fa/angle-down';
import ToggleLeft from 'react-icons/lib/fa/angle-right';
import Copy from 'react-icons/lib/md/note-add';


const TypeObject = (props) => {
  return (
    <tr className="layout--row">
      <td className="model--panel">
        <span className="model--copy" title="copy path to key">
          <Copy />
        </span>
      </td>
      <td className="model--key model--key-isObject">
        <table style={{ marginLeft: `${props.meta.mleft}px` }}>
          <tbody>
            <tr>
              <td>
                {
                  !props.meta.isExpanded ? <ToggleLeft
                    className="model--toggler"
                    onClick={() => props.appendNodesToTree(props.meta)}
                  /> : <ToggleDown
                    className="model--toggler"
                    onClick={() => props.removeNodesFromTree(props.meta.id)}
                  />
                }
              </td>
              <td>{ props.Qey }</td>
              <td
                className="model--value model--value-object"
                title="Type array"
              >{ props.meta.type === 'Object'
                  ? `{ ${props.contentCount} }`
                  : `[ ${props.contentCount} ]` }
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

TypeObject.propTypes = {
  meta: PropTypes.object,
  contentCount: PropTypes.string,
  Qey: PropTypes.string.isRequired,
  appendNodesToTree: PropTypes.func,
  removeNodesFromTree: PropTypes.func
};

export default TypeObject;
