import React, { PureComponent } from 'react';

import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';
import Modal from './components/url_modal';


class App extends PureComponent {

  render() {
    return (
      <div className="container">
        <Modal />
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

