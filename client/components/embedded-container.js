import React from 'react';
import PropTypes from 'prop-types';
import { EmbeddedApp } from '@shopify/polaris/embedded';

function EmbeddedContainer(props) {
  let apiKey = document.getElementById('easdk_apikey').value;
  let shopOrigin = document.getElementById('easdk_shoporigin').value;

  return (
    <EmbeddedApp apiKey={apiKey} shopOrigin={shopOrigin} forceRedirect={true} debug={false}>
      {props.children}
    </EmbeddedApp>
  );
}

EmbeddedContainer.propTypes = {
  children: PropTypes.node
};

export default EmbeddedContainer;
