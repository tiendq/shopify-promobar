import fetch from 'unfetch';

// Handling status error
// https://www.tjvantoll.com/2015/09/13/fetch-and-errors/

function savePromo(promo) {
  return fetch('/promo/edit', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(promo)
  })
  .then(response => {
    if (200 === response.status)
      return response.json();
    else
      return { error: response.status };
  });
}

export {
  savePromo
};
