import React, { Component } from 'react';


import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';
import Modal from './components/url_modal';

import ParserShell from './parser/objectParser';
import { getJson, fetchRequestedUrl, validUrl } from './parser/demo';
import pathFinder from './parser/pathFinder';

class App extends Component {
  state = {
    json: '',
    isError: false,
    errorMessage: '',
    tree: [],
    cache: [],
    tabSize: 2,
    urlModalRequest: false,
    loadUrlError: ''
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
  static parseJson(array, headers) {
    return ParserShell()
      .getInstance(array, headers)
      .buildAbstractTree();
  }

  setTree = () => {
    const verify = this.checkJsonValidity(this.state.json);
    if (verify === 'isValid') {
      const tree = App.parseJson(this.state.json, true);
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

  appendNodesToTree = (payload, id, margin, payloadIsParsed, refnumber) => {
    if (payload.length === 0) return;

    let subtree,    // eslint-disable-line
      insertionPoint;

    if (!payloadIsParsed) {
      subtree = App.parseJson(JSON.stringify(...payload)).map((each) => {
        each.meta.mleft = margin + 20;
        each.meta.isChildof = id;
        return each;
      });
      insertionPoint = this.state.tree.findIndex(each => each.meta.id === id);
    } else {
      subtree = payload;
      insertionPoint = refnumber;
    }
    const tree = [...this.state.tree];
    Array.prototype.splice.apply(tree, [insertionPoint + 1, 0, ...subtree]);

    // eslint-disable-next-line
      var insertionNode = tree[insertionPoint];

    if (!insertionNode.meta.isExpanded) {
      insertionNode.meta.isExpanded = true;
      insertionNode.meta.payload = subtree;
      insertionNode.meta.payloadIsParsed = true;
      insertionNode.meta.insertionPoint = insertionPoint;
      this.setState({ tree });
    }
  };

  prune(nodes) {
    return nodes
      .filter((each) => {
        return ['Object', 'Array'].includes(each.meta.type);
      })
      .map((each) => {
        each.meta.isExpanded = false;
        return each.meta.id;
      });
  }

  removeNodesFromTree = (id) => {
    const refPoint = this.state.tree.findIndex(node => node.meta.id === id);
    const skippedNodesFromStart = this.state.tree.slice(0, refPoint + 1);

    const skippedNodesFromEnd = this.state.tree
      .slice(refPoint + 1)
      .filter(node => node.meta.isChildof !== id);

    const removedNodes = this.state.tree.slice(
      skippedNodesFromStart.length,
      this.state.tree.length - skippedNodesFromEnd.length
    );

    const tree = [...skippedNodesFromStart, ...skippedNodesFromEnd];
    const mess = this.prune(removedNodes);

    console.log(removedNodes);
    var ref = tree[refPoint]; // eslint-disable-line
    ref.meta.isExpanded = false;

    this.setState({ tree: tree.filter(each => !mess.includes(each.meta.isChildof)) });
  };

  format = () => {
    if (this.state.json.length === 0) return false;
    const json = JSON.stringify(JSON.parse(this.state.json), null, this.state.tabSize);
    return this.setState({ json });
  }

  collapseAll = () => {
    this.setState(prev => ({ tree: prev.cache }));
  }

  loadDemo = () => {
    getJson().then((json) => {
      this.setState({ json: JSON.stringify(json, null, this.state.tabSize) });
      this.setTree();
    });
  }

  cleanSlate = () => {
    this.setState({
      json: '',
      isError: false,
      errorMessage: '',
      tree: [],
      cache: []
    });
  }

  tabSizeChange = (val) => {
    if (val >= 1 && val <= 5) {
      this.setState({ tabSize: parseInt(val) }); // eslint-disable-line
    }
  }

  loadUrl = (url) => {
    if (validUrl(url)) {
      fetchRequestedUrl(url)
        .then((json) => {
          this.setState({
            json: JSON.stringify(json, null, this.state.tabSize),
            urlModalRequest: false,
            loadUrlError: ''
          });
          this.setTree();
        }).catch(err => this.setState({ loadUrlError: err.message }));
    }
  }
  modalControll = (state) => {
    this.setState({ urlModalRequest: state });
  }

  loadLocalStorage = () => {
    const json = localStorage.getItem('store') || JSON.stringify([]);
    this.setState({ json }, this.setTree);
  }

  copyPath = (id) => {
    console.log(JSON.stringify(this.state.tree, null, 2));
    return pathFinder.trace(id, [...this.state.tree]);
  }

  render() {
    return (
      <div className="container">
        <Modal
          loadUrl={this.loadUrl}
          modalIsRequested={this.state.urlModalRequest}
          urlError={this.state.loadUrlError}
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

