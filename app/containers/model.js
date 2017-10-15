import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapse from 'react-icons/lib/ti/arrow-minimise-outline';

import Primitive from '../components/Primitives';
import TypeObject from '../components/isTypeObject';
import { resetTree } from '../redux/actions/dumper_action';
import { appendToTree } from '../redux/actions/model_actions';

class Modeler extends React.Component {
  isOfTypePrimitive(each) {
    const isPrimitive = ['number', 'string', 'boolean'].includes(
      each.meta.type);
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
          Qey={each.Qey}
          contentCount={each.contentCount.toString()}
          meta={each.meta}
          appendNodesToTree={this.props.appendNodesToTree}
        />
      );
    });
    return (
      <div className={`layout ${this.props.parseFail.error
        ? 'layout--isError'
        : ''}`}
      >
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
           ${this.props.parseFail.error && 'layout--errorhandler-showing'}`}
        >
          { 'Unable to parser json. '.concat(this.props.parseFail.errorMessage)
            .concat(' ☹️') }
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
  parseFail: PropTypes.shape({
    error: PropTypes.bool,
    errorMessage: PropTypes.string,
  }),
  appendNodesToTree: PropTypes.func,
  collapseAll: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    tree: state.tree,
    parseFail: state.parseFail,
  }
);

const mapDispatchToProps = dispatch => (
  {
    reset() {
      dispatch(resetTree());
    },
    appendNodesToTree(meta) {
      dispatch(appendToTree(meta));
    }
  }
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modeler);
