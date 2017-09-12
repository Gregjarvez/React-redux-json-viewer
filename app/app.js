import React from 'react';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';

const App = () => {
  return (
    <div className="container">
      <Navigation />
      <div className="app">
        <Dumper />
        <Modeler />
      </div>
    </div>
  );
};

export default App;

