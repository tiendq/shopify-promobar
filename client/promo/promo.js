import React from 'react';
import ReactDOM from 'react-dom';
import { loadPromoData } from './promo-client';
import ShopifyPromoBar from './shopify-promo-bar';

(function () {
  let config = window.ShopifyPromoBar;

  if (config && config.appUrl && config.shopId) {
    loadPromoData(config.appUrl, config.shopId)
      .then(result => {
        if (result && result.content)
          setupPromoBar(result);
      })
      .catch(error => console.error(error));
  }
})();

function setupPromoBar(promo) {
  // Change z-index of Shopify admin bar to hide it under our bar.
  let adminBar = document.getElementById('admin_bar_iframe');

  if (adminBar)
    adminBar.style.zIndex = '999';

  // Create bar and attach it to the document.
  let id = 'bar' + Date.now().toString();
  let container = document.createElement('div');
  container.id = id;
  container.classList.add('sticky-promo-bar', promo.position);
  document.body.appendChild(container);

  setTimeout(() => {
    ReactDOM.render(<ShopifyPromoBar promo={promo} />, document.getElementById(id));
  }, 1000 * promo.delay);
}
