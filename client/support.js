import React from 'react';
import { render } from 'react-dom';
import initReactFastclick from 'react-fastclick';
import EmbeddedContainer from './components/embedded-container';
import SupportPage from './components/shop/support-page';

window.onload = function () {
  initReactFastclick();
  render(<EmbeddedContainer><SupportPage /></EmbeddedContainer>, document.getElementById('root'));
}
