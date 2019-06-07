import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import ShopifyPromoBar from '../../promo/shopify-promo-bar';

function PromoPreview(props) {
  return (
    <Card title="Preview" sectioned>
      <div className="promo-preview sticky-promo-bar">
        <ShopifyPromoBar promo={props.promo} previewMode={true} />
      </div>
    </Card>
  );
}

PromoPreview.propTypes = {
  promo: PropTypes.object.isRequired
};

export default PromoPreview;
