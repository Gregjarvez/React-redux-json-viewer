import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-icons/lib/ti/arrow-minimise-outline';

import Primitive from '../components/Primitives';
import TypeObject from '../components/isTypeObject';

class Modeler extends React.Component {
  isOfTypePrimitive(each) {
    const isPrimitive = ['number', 'string', 'boolean']
      .includes(each.meta.type);
    return isPrimitive;
  }

  render() {
    const layout = this.props.tree.map((each) => {
      if (this.isOfTypePrimitive(each)) {
        return (
          <Primitive
            key={each.meta.id}
            Qey={each.Qey}
            value={each.value}
            meta={each.meta}
            copyPath={this.props.copyPath}
          />
        );
      }
      return (
        <TypeObject
          key={each.meta.id}
          Qey={each.Qey}
          contentCount={each.contentCount.toString()}
          meta={each.meta}
          appendNodesToTree={this.props.appendNodesToTree}
          removeNodesFromTree={this.props.removeNodesFromTree}
          copyPath={this.props.copyPath}
        />
      );
    });

    return (
      <div className={`layout ${this.props.isError ? 'layout--isError' : ''}`}>
        <div className="layout--setting layout--setting-isabsolute">
          <span title="collapse all">
            <Collapse
              className="layout--collapse"
              title="collapse all"
              onClick={this.props.collapseAll}
            />
          </span>
        </div>
        <div
          className={`layout--errorhandler
           ${this.props.isError && 'layout--errorhandler-showing'}`}
        >
          {'Unable to parser json. '.concat(this.props.errorMessage).concat(' ☹️')}
        </div>
        <div className="layout--container">
          <table className="layout--embedded">
            <tbody>
              { layout }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

Modeler.propTypes = {
  tree: PropTypes.array,
  appendNodesToTree: PropTypes.func.isRequired,
  removeNodesFromTree: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  collapseAll: PropTypes.func.isRequired,
  copyPath: PropTypes.func
};

export default Modeler;
