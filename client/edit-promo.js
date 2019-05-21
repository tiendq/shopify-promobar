import React from 'react';
import { render } from 'react-dom';
import initReactFastclick from 'react-fastclick';
import EmbeddedContainer from './components/embedded-container';
import EditPromoPage from './components/promo/edit-promo-page';

window.onload = function () {
  initReactFastclick();
  render(<EmbeddedContainer><EditPromoPage viewData={window.viewData} /></EmbeddedContainer>,
    document.getElementById('root'));
}
