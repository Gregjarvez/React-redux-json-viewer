import React, { Component } from 'react';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';

import Primitive from './components/Primitives';
import TypeObject from './components/isTypeObject';
import ParserShell from './parser/objectParser';

class App extends Component {
  state = {
    json: '',
    isError: false,
    isValid: true,
    errorMessage: '',
    parsedData: null,
    tree: []
  };

  setJsonToControllerState = (json) => {
    this.setState({ json });
  };

  // eslint-disable-next-line react/sort-comp
  static parseObject(array) {
    return ParserShell()
      .getInstance(array)
      .buildAbstractTree();
  }

  setTree = () => {
    const tree = App.parseObject(this.state.json);
    this.setState({ tree });
  };


  isOfTypePrimitive(each) {
    const isPrimitive = ['number', 'string', 'boolean'].includes(each.meta.type);
    return isPrimitive;
  }

  appendToTree = (load, nodeRef, margin) => {
    if (load.length === 0) return;

    const subtree = App.parseObject(JSON.stringify(...load)).map((each) => {
      each.meta.mleft = margin + 20;
      return each;
    });
    subtree.shift();

    const insertionIndex = this.state.tree.findIndex(each => each.meta.id === nodeRef);
    const ammended = [
      ...this.state.tree.slice(0, insertionIndex + 1),
      ...subtree,
      ...this.state.tree.slice(insertionIndex + 1)
    ];
    // eslint-disable-next-line
    var ref = ammended[insertionIndex];

    if (!ref.meta.isExpanded) {
      ref.meta.isExpanded = true;
      this.setState({ tree: ammended });
    }
  }

  removeFromTree = (id, contentCount) => {
    const refPoint = this.state.tree.findIndex(node => node.meta.id === id);
    console.log(id, contentCount, refPoint);
    const modified = [
      ...this.state.tree.slice(0, refPoint + 1),
      ...this.state.tree.slice((refPoint + contentCount + 1))
    ];
    var ref = modified[refPoint]; // eslint-disable-line
    ref.meta.isExpanded = false;
    this.setState({ tree: modified });
  }


  modelBuilder = (each) => {
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
        appendToTree={this.appendToTree}
        removeFromTree={this.removeFromTree}
      />
    );
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <div className="app">
          <Dumper
            startParse={this.setTree}
            setJsonToControllerState={this.setJsonToControllerState}
            json={this.state.json}
          />
          <Modeler
            tree={this.state.tree}
            modelBuilder={this.modelBuilder}
          />
        </div>
      </div>
    );
  }
}

export default App;

