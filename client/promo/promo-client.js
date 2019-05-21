import fetch from 'unfetch';

function loadPromoData(appUrl, shopId) {
  return fetch(`${appUrl}/api/promo?shopId=${shopId}`)
    .then(response => {
      if (200 === response.status)
        return response.json();
      else
        return null;
    });
}

export {
  loadPromoData
};
