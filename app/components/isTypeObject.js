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
                      onClick={() => props.appendToTree(
                        props.meta.payload,
                        props.meta.id,
                        props.meta.mleft
                      )}
                    /> :
                    <ToggleDown
                      className="model--toggler"
                      onClick={() => props.removeFromTree(
                        props.meta.id,
                        props.contentCount
                      )}
                    />
                }
              </td>
              <td>{ props.type }</td>
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
  type: PropTypes.string.isRequired,
  contentCount: PropTypes.number.isRequired,
  meta: PropTypes.object,
  appendToTree: PropTypes.func.isRequired,
  removeFromTree: PropTypes.func.isRequired

};

export default TypeObject;
