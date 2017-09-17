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
                  !props.meta.isExpanded ?
                    <ToggleLeft
                      className="model--toggler"
                      onClick={() => props.appendNodesToTree(
                        props.meta.payload,
                        props.meta.id,
                        props.meta.mleft,
                        props.meta.payloadIsParsed,
                        props.meta.insertionPoint
                      )}
                    /> :
                    <ToggleDown
                      className="model--toggler"
                      onClick={() => props.removeNodesFromTree(props.meta.id)}
                    />
                }
              </td>
              <td>{ props.Qey }</td>
              <td
                className="model--value model--value-object"
                title="Type array"
              >{ props.meta.type === 'Object' ? `{ ${props.contentCount} }` : `[ ${props.contentCount} ]` }
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

TypeObject.propTypes = {
  Qey: PropTypes.string.isRequired,
  contentCount: PropTypes.string,
  meta: PropTypes.object,
  appendNodesToTree: PropTypes.func.isRequired,
  removeNodesFromTree: PropTypes.func.isRequired

};

export default TypeObject;
