import React, { Component } from 'react';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';


import ParserShell from './parser/objectParser';

class App extends Component {
  state = {
    json: '',
    isError: false,
    errorMessage: '',
    tree: []
  };

  verifyValidity(json) { // eslint-disable-line
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
  static parseObject(array) {
    return ParserShell()
      .getInstance(array)
      .buildAbstractTree();
  }

  setTree = () => {
    const verify = this.verifyValidity(this.state.json);
    if (verify === 'isValid') {
      const tree = App.parseObject(this.state.json);
      return this.setState({
        tree,
        isError: false
      });
    }
    return this.setState({
      tree: [],
      isError: true,
      errorMessage: verify.message
    });
  };

  appendToTree = (load, id, margin) => {
    if (load.length === 0) return;

    const subtree = App.parseObject(JSON.stringify(...load)).map((each) => {
      each.meta.mleft = margin + 20;
      each.meta.isChildof = id;
      return each;
    });
    subtree.shift();

    const insertionIndex = this.state.tree.findIndex(
      each => each.meta.id === id);
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
  };

  removeFromTree = (id) => {
    const refPoint = this.state.tree.findIndex(node => node.meta.id === id);
    const skip = this.state.tree.slice(0, refPoint + 1);
    const process = this.state.tree.slice(refPoint + 2).map((each) => {
      console.log(each.meta.id, id);
      if (each.meta.isExpanded) {
        this.removeFromTree(each.meta.id);
        each.meta.isExpanded = false;
        return each;
      }
      return each;
    }).filter(node => node.meta.isChildof !== id);
    const modified = [...skip, ...process];

    var ref = modified[refPoint]; // eslint-disable-line
    ref.meta.isExpanded = false;

    this.setState({ tree: modified });
  };


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
            isError={this.state.isError}
            errorMessage={this.state.errorMessage}
            appendToTree={this.appendToTree}
            removeFromTree={this.removeFromTree}
          />
        </div>
      </div>
    );
  }
}

export default App;

