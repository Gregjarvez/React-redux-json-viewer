import React from 'react';
import { string, number } from 'prop-types';
// import ToggleDown from 'react-icons/lib/fa/angle-down';
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
      <td className="model--key">
        <table>
          <tbody>
            <tr>
              <td><ToggleLeft className="model--toggler" /></td>
              <td>{props.type}</td>
              <td
                className="model--value model--value-object"
                title="Type array"
              >{`{ ${props.contentCount} }`}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

TypeObject.propTypes = {
  type: string.isRequired,
  contentCount: number.isRequired,
};

export default TypeObject;
