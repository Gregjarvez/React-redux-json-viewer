import React, { PureComponent } from 'react';

import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';
import Modal from './components/url_modal';

import { fetchRequestedUrl, validUrl } from './parser/demo';

class App extends PureComponent {
  
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

