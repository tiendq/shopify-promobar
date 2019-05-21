// v1.2.0
// #16: Add color picker for text/bkground
db.promos.updateMany({
  shopId: { $ne: '' }
}, {
  $set: {
    color: '#333',
    bgColor: '#ffce4b'
  }
});

// #17: Add CTA button
db.promos.updateMany({
  shopId: { $ne: '' }
}, {
  $set: {
    cta: {
      enabled: false,
      title: '',
      targetUrl: '',
      color: '#333',
      bgColor: '#ff9b0b'
    }
  }
});
