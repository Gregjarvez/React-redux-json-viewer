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
    console.log(ammended);
    this.setState({ tree: ammended });
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

