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

  setTree = () => {
    const tree = ParserShell()
      .getInstance(this.state.json)
      .buildAbstractTree();

    this.setState({ tree });
  };

  parseSubsets(array) {
    return ParserShell()
      .getInstance(array)
      .buildAbstractTree();
  }

  isOfTypePrimitive = (each) => {
    const isPrimitive = ['number', 'string', 'boolean'].includes(each.meta.type);
    return isPrimitive;
  }

  modelBuilder = (each, index) => {
    const key = each.meta.type.concat(index);
    if (this.isOfTypePrimitive(each)) {
      return (
        <Primitive
          key={key}
          Qey={each.Qey}
          value={each.value}
          meta={{ type: each.meta.type }}
        />
      );
    }
    return (
      <TypeObject
        key={key}
        type={each.type}
        contentCount={each.contentCount}
        meta={each.meta}
        parseSubsets={each.meta.payload.length > 0 ? this.parseSubsets : f => f}
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
            parseSubsets={this.parseSubsets}
            modelBuilder={this.modelBuilder}
          />
        </div>
      </div>
    );
  }
}

export default App;

