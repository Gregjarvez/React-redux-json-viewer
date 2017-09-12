import React from 'react';
import { render } from 'react-dom';
import App from './app';

import './styles/style.scss';

const Renderer = () => {
  render(<App />, document.getElementById('root'));
};

Renderer();

if (module.hot) {
  module.hot.accept('./app', () => {
    Renderer();
  });
}
