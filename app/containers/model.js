import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Primitive from '../components/Primitives';
import TypeObject from '../components/isTypeObject';
import {
  appendToTree, collapseAll,
  removeFromNode
} from '../redux/actions/model';

class Modeler extends Component {
  static primitive(each) {
    return ['number', 'string', 'boolean'].includes(
      each.meta.type);
  }

  get typeObjectMethods() {
    const { appendNodesToTree, removeNodesFromTree } = this.props;
    return {
      appendNodesToTree,
      removeNodesFromTree
    };
  }

  get layout() {
    return this.props.tree.map((contruct) => {
      return Modeler.primitive(contruct) ?
        <Primitive key={contruct.meta.id} {...contruct} /> :
        <TypeObject
          key={contruct.meta.id}
          {...contruct}
          {...this.typeObjectMethods}
        />;
    });
  }

  render() {
    const { json, parseFail, collapseAll } = this.props;

    return (
      <div className={`layout ${parseFail.error ? 'layout--isError' : ''}`}>
        <div className="layout--setting">
          <button className="layout--text" onClick={() => collapseAll(json)}>
              Collapse All
          </button>
        </div>
        <div className={`layout--errorhandler ${parseFail.error ? 'layout--errorhandler-showing' : ''}`}>
          { `${parseFail.errorMessage}` }
        </div>
        <div className="layout--container">
          <table>
            <tbody>{ Modeler.layout }</tbody>
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
