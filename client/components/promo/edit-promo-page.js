import React from 'react';
import PropTypes from 'prop-types';
import { Page } from '@shopify/polaris';
import SuccessInstalledBanner from '../success-installed-banner';
import EditPromoForm from './edit-promo-form';
import PromoPreview from './promo-preview';

class EditPromoPage extends React.Component {
  constructor(props) {
    super(props);

    this.secondaryActions = [{
      content: 'Support',
      url: '/shop/support',
      target: 'app'
    }];

    this.state = {
      previewPromo: { ...props.viewData.promo },
      welcome: props.viewData.welcome
    };

    this.initialPromo = { ...props.viewData.promo };
    this.iconUrl = `${window.location.protocol}//${window.location.host}/static/images/icons/app-20x20.png`;
  }
  render() {
    return (
      <Page title="Edit Promo Bar" icon={this.iconUrl} secondaryActions={this.secondaryActions} fullWidth>
        <SuccessInstalledBanner welcome={this.state.welcome} onDismiss={this.dismissWelcomeMessageHandler} />
        <EditPromoForm promo={this.initialPromo} onChange={this.changePromoHandler} />
        <PromoPreview promo={this.state.previewPromo} />
      </Page>
    );
  }
  dismissWelcomeMessageHandler = () => {
    this.setState({ welcome: false });
  }
  changePromoHandler = (value) => {
    let { cta, ...rest } = value;

    this.setState({
      previewPromo: {
        ...rest,
        cta: { ...cta }
      }
    });
  }
}

EditPromoPage.propTypes = {
  viewData: PropTypes.object.isRequired
};

export default EditPromoPage;
