import React, { Component } from 'react';

import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';
import Modal from './components/url_modal';

import { fetchRequestedUrl, validUrl } from './parser/demo';

class App extends Component {

  state = {
    errorMessage: '',
    urlModalRequest: false,
    urlErrorMessage: ''
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

  render() {
    return (
      <div className="container">
        <Navigation />
        <div className="app">
          <Dumper />
          <Modeler />
        </div>
      </div>
    );
  }
}

export default App;

