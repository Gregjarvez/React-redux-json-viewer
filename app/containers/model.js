import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapse from 'react-icons/lib/ti/arrow-minimise-outline';

import Primitive from '../components/Primitives';
import TypeObject from '../components/isTypeObject';
import {
  appendToTree, collapseAll,
  removeFromNode
} from '../redux/actions/model';

class Modeler extends Component {
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
          removeNodesFromTree={this.props.removeNodesFromTree}
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
              onClick={() => this.props.collapseAll(this.props.json)}
            />
          </span>
        </div>
        <div
          className={`layout--errorhandler ${this.props.parseFail.error
                                             && 'layout--errorhandler-showing'}`}
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
  json: PropTypes.string,
  parseFail: PropTypes.shape({
    error: PropTypes.bool,
    errorMessage: PropTypes.string
  }),
  appendNodesToTree: PropTypes.func,
  removeNodesFromTree: PropTypes.func,
  collapseAll: PropTypes.func
};

const mapStateToProps = state => ({
  tree: state.tree,
  parseFail: state.parseFail,
  json: state.json
});

const mapDispatchToProps = dispatch => ({
  appendNodesToTree: meta => dispatch(appendToTree(meta)),
  removeNodesFromTree: id => dispatch(removeFromNode(id)),
  collapseAll: json => dispatch(collapseAll(json))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modeler);
