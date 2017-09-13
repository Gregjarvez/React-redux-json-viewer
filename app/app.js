import React, { Component } from 'react';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';


class App extends Component {
  state = {
    json: '',
    isError: false,
    isValid: true,
    errorMessage: '',
    parsedData: null
  };

  setJsonToControllerState = (json) => {
    try {
      JSON.parse(json);
    } catch (err) {
      this.setState({ errorMessage: err });
    }
    this.setState({ json });
  };

  render() {

    return (
      <div className="container">
        <Navigation />
        <div className="app">
          <Dumper
            setJsonToControllerState={this.setJsonToControllerState}
            json={this.state.json}
          />
          <Modeler />
        </div>
      </div>
    );
  }
}

export default App;

