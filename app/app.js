import React, { Component } from 'react';
import Navigation from './components/nav';
import Dumper from './containers/dumper';
import Modeler from './containers/model';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: null,
      isError: false,
      isValid: true,
    };
  }

 setJsonToControllerState = json => this.setState({ json });


 render() {
   return (
     <div className="container">
       <Navigation />
       <div className="app">
         <Dumper
           setJsonToControllerState={this.setJsonToControllerState}
         />
         <Modeler />
       </div>
     </div>
   );
 }
}

export default App;

