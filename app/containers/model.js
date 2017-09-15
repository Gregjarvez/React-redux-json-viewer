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
          />
        );
      }
      return (
        <TypeObject
          key={each.meta.id}
          type={each.type}
          contentCount={each.contentCount}
          meta={each.meta}
          appendToTree={this.props.appendToTree}
          removeFromTree={this.props.removeFromTree}
        />
      );
    });

    return (
      <div className={`layout ${this.props.isError && 'layout--isError'}`}>
        <div className="layout--setting">
          <span title="collapse all">
            <Collapse className="layout--collapse" />
          </span>
        </div>
        <div className={`layout--errorhandler ${this.props.isError && 'layout--errorhandler-showing'}`}>
          {'Unable to parser json. '.concat(this.props.errorMessage).concat(' ☹️')}
        </div>
        <table className="layout--embedded">
          <tbody>
            { layout }
          </tbody>
        </table>
      </div>
    );
  }
}

Modeler.propTypes = {
  tree: PropTypes.array,
  appendToTree: PropTypes.func.isRequired,
  removeFromTree: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default Modeler;
