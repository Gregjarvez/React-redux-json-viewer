import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from './redux/store';


const Container = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Container;
