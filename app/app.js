import React, { PureComponent } from 'react';

import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';


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

