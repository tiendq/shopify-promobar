import React from 'react';
import PropTypes from 'prop-types';
import { Banner, Card } from '@shopify/polaris';

function SuccessInstalledBanner({ welcome, onDismiss }) {
  if (welcome) {
    return (
      <Card>
        <Banner
          status="success"
          title="You successfully installed Promo Bar."
          onDismiss={onDismiss}
        />
      </Card>
    );
  }

  return null;
}

SuccessInstalledBanner.propTypes = {
  welcome: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default SuccessInstalledBanner;
