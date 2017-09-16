import React, { Component } from 'react';
import Perf from 'react-addons-perf';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';

import ParserShell from './parser/objectParser';


window.Perf = Perf;
Perf.start();

class App extends Component {
  state = {
    json: '',
    isError: false,
    errorMessage: '',
    tree: [],
    cache: []
  };

  checkJsonValidity(json) { // eslint-disable-line
    try {
      JSON.parse(json);
      return 'isValid';
    } catch (error) {
      return error;
    }
  }

  setJsonToControllerState = (json) => {
    return this.setState({ json });
  };

  // eslint-disable-next-line react/sort-comp
  static parseJson(array) {
    return ParserShell().getInstance(array).buildAbstractTree();
  }

  setTree = () => {
    const verify = this.checkJsonValidity(this.state.json);
    if (verify === 'isValid') {
      const tree = App.parseJson(this.state.json);
      return this.setState({
        tree,
        isError: false,
        errorMessage: '',
        cache: tree
      });
    }
    return this.setState({
      tree: [],
      isError: true,
      errorMessage: verify.message
    });
  };

  appendNodesToTree = (payload, id, margin) => {
    if (payload.length === 0) return;
    console.log(payload);

    const subtree = App.parseJson(JSON.stringify(...payload))
      .map((each) => {
        each.meta.mleft = margin + 20;
        each.meta.isChildof = id;
        return each;
      });

    subtree.shift(); // remove extra subtree headers

    const insertionPoint = this.state.tree.findIndex(each => each.meta.id === id);
    const construct = [
      ...this.state.tree.slice(0, insertionPoint + 1),
      ...subtree,
      ...this.state.tree.slice(insertionPoint + 1)
    ];
    // eslint-disable-next-line
    var insertionNode = construct[insertionPoint];
    if (!insertionNode.meta.isExpanded) {
      insertionNode.meta.isExpanded = true;
      this.setState({ tree: construct });
    }
  };

  prune(nodes) {
    return nodes
      .filter((each) => {
        return ['Object', 'Array'].includes(each.meta.type);
      })
      .map(each => each.meta.id);
  }

  removeNodesFromTree = (id) => {
    const refPoint = this.state.tree.findIndex(node => node.meta.id === id);
    const skipNodes = this.state.tree.slice(0, refPoint + 1);

    const process = this.state.tree
      .slice(refPoint + 2)
      .map((each) => {
        if (each.meta.isExpanded) {
          each.meta.isExpanded = false;
          return each;
        }
        return each;
      })
      .filter(node => node.meta.isChildof !== id);

    const prunedNodes = this.state.tree.slice(skipNodes.length, this.state.tree.length
                                                                - process.length);
    const tree = [...skipNodes, ...process];
    const mess = this.prune(prunedNodes);

    var ref = tree[refPoint]; // eslint-disable-line
    ref.meta.isExpanded = false;

    this.setState({ tree: tree.filter(each => !mess.includes(each.meta.isChildof)) });
  };

  format = () => {
    const json = JSON.stringify(JSON.parse(this.state.json), null, 2);
    return this.setState({ json });
  }

  collapseAll = () => {
    this.setState(prev => ({ tree: prev.cache }));
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <div className="app">
          <Dumper
            format={this.format}
            json={this.state.json}
            startParse={this.setTree}
            setJsonToControllerState={this.setJsonToControllerState}
          />
          <Modeler
            tree={this.state.tree}
            isError={this.state.isError}
            collapseAll={this.collapseAll}
            errorMessage={this.state.errorMessage}
            appendNodesToTree={this.appendNodesToTree}
            removeNodesFromTree={this.removeNodesFromTree}
          />
        </div>
      </div>
    );
  }
}

export default App;

