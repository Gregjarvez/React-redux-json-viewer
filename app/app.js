import React, { Component } from 'react';

import store from './redux/store';

import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';
import Modal from './components/url_modal';

import { getJson, fetchRequestedUrl, validUrl } from './parser/demo';

class App extends Component {

  state = {
    isError: false,
    errorMessage: '',
    urlModalRequest: false,
    urlErrorMessage: ''
  };

  appendNodesToTree = (payload, id, margin, ...rest) => {
    const [payloadIsParsed, refnumber, childof] = rest;
    if (payload.length === 0) return;

    let subtree,    // eslint-disable-line
      insertionPoint;

    if (!payloadIsParsed) {
      subtree = App.parseJson(JSON.stringify(...payload)).map((each) => {
        each.meta.mleft = margin + 20;
        each.meta.isChildof.push(id, ...childof);
        return each;
      });

      insertionPoint = this.state.tree.findIndex(each => each.meta.id === id);
    } else {
      subtree = payload;
      insertionPoint = refnumber;
    }
    // todo reopen previously opened objects or array

    const tree = [...this.state.tree];
    Array.prototype.splice.apply(tree, [insertionPoint + 1, 0, ...subtree]);

    // eslint-disable-next-line
    const insertionNode = tree[insertionPoint];
    if (!insertionNode.meta.isExpanded) {
      insertionNode.meta.isExpanded = true;
      insertionNode.meta.payload = subtree;
      insertionNode.meta.payloadIsParsed = true;
      insertionNode.meta.insertionPoint = insertionPoint;
      this.setState({ tree: App.populateWithPath(tree) });
    }
  };

  removeNodesFromTree = (id) => {
    const refPoint = this.state.tree.findIndex(node => node.meta.id === id);
    const skippedNodesFromStart = this.state.tree.slice(0, refPoint + 1);
    const skippedNodesFromEnd = this.state.tree.slice(refPoint + 1).filter(
      node => !node.meta.isChildof.includes(id));

    const tree = [...skippedNodesFromStart, ...skippedNodesFromEnd];

    const ref = tree[refPoint]; // eslint-disable-line
    ref.meta.isExpanded = false;

    this.setState({
      tree
    });
  };

  collapseAll = () => {
    this.setState(prev => (
      { tree: prev.cache }
    ));
  };

  loadDemo = () => {
    getJson().then((json) => {
      this.setState(
        { json: JSON.stringify(json, null, this.state.tabSize) });
      this.setTree();
    });
  };

  cleanSlate = () => {
    this.setState({
      json: '',
      isError: false,
      errorMessage: '',
      tree: [],
      cache: []
    });
  };

  tabSizeChange = (val) => {
    if (val >= 1 && val <= 5) {
      this.setState({ tabSize: parseInt(val) }); // eslint-disable-line
    }
  };

  loadUrl = (url) => {
    if (validUrl(url)) {
      fetchRequestedUrl(url).then((json) => {
        this.setState({
          json: JSON.stringify(json, null, this.state.tabSize),
          urlModalRequest: false,
          urlErrorMessage: ''
        });
        this.setTree();
      }).catch(err => this.setState({ urlErrorMessage: err.message }));
    }
  };
  modalControll = (state) => {
    this.setState({ urlModalRequest: state });
  };

  loadLocalStorage = () => {
    const json = localStorage.getItem('store') || JSON.stringify([]);
    this.setState({ json }, this.setTree);
  };

  render() {
    return (
      <div className="container">
        <Modal
          loadUrl={this.loadUrl}
          modalIsRequested={this.state.urlModalRequest}
          urlErrorMessage={this.state.urlErrorMessage}
          closeModal={this.modalControll}
        />
        <Navigation
          tabSize={this.state.tabSize}
          loadDemo={this.loadDemo}
          cleanSlate={this.cleanSlate}
          tabSizeChange={this.tabSizeChange}
          json={this.state.json}
          openModal={this.modalControll}
          loadLocalStorage={this.loadLocalStorage}
        />
        <div className="app">
          <Dumper />
          <Modeler
            tree={this.state.tree}
            isError={this.state.isError}
            collapseAll={this.collapseAll}
            errorMessage={this.state.errorMessage}
            copyPath={this.copyPath}
            appendNodesToTree={this.appendNodesToTree}
            removeNodesFromTree={this.removeNodesFromTree}
          />
        </div>
      </div>
    );
  }
}


export default App;

