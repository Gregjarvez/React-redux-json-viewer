import React from 'react';
import { render } from 'react-dom';
import Container from './entry';
import './styles/style.scss';


const Renderer = () => {
  render(<Container />, document.getElementById('root'));
};

Renderer();

if (module.hot) {
  module.hot.accept('./app', () => {
    Renderer();
  });
}
