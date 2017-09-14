import React from 'react';
import { string, number, object, func } from 'prop-types';
// import ToggleDown from 'react-icons/lib/fa/angle-down';
import ToggleLeft from 'react-icons/lib/fa/angle-right';
import Copy from 'react-icons/lib/md/note-add';


class TypeObject extends React.Component {
  state = {
    parsedSubset: [],
    subsetIsVisible: false
  }

  parserSubset(metaData) {
    console.log(...metaData);
    const tree = this.props.parseSubsets(JSON.stringify(...metaData));
    console.log(tree);
  }

  render() {
    // const subset = this.state.parsedSubset.map()
    return (
      <tr className="layout--row">
        <td className="model--panel">
          <span className="model--copy" title="copy path to key">
            <Copy />
          </span>
        </td>
        <td className="model--key model--key-isObject">
          <table>
            <tbody>
              <tr>
                <td>
                  <ToggleLeft className="model--toggler" onClick={() => this.parserSubset(this.props.meta.payload)} />
                </td>
                <td>{ this.props.type }</td>
                <td
                  className="model--value model--value-object"
                  title="Type array"
                >{ `{ ${this.props.contentCount} }` }
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}

TypeObject.propTypes = {
  type: string.isRequired,
  contentCount: number.isRequired,
  meta: object,
  // eslint-disable-next-line react/no-unused-prop-types
  parseSubsets: func.isRequired
};

export default TypeObject;
