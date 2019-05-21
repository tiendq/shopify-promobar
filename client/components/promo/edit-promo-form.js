import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@shopify/polaris';
import { validateForm } from './edit-promo-validator';
import { savePromo } from './promo-client';
import MessageFormSection from './message-form-section';
import CTAFormSection from './cta-form-section';

class EditPromoForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      promo: { ...props.promo },
      barError: {
        content: false,
        targetUrl: false
      },
      ctaError: {
        title: false,
        targetUrl: false
      }
    };
  }
  render() {
    let saveChanges = {
      content: 'Save changes',
      onAction: this.saveChangesHandler
    };

    return (
      <Card title="Settings" primaryFooterAction={saveChanges}>
        <Card.Section title="Message">
          <MessageFormSection promo={this.state.promo} validationError={this.state.barError} onChange={this.changeBarHandler} />
        </Card.Section>
        <Card.Section title="Call to Action">
          <CTAFormSection promo={this.state.promo} validationError={this.state.ctaError} onChange={this.changeCTAHandler} />
        </Card.Section>
      </Card>
    );
  }
  changeBarHandler = (value) => {
    this.setState(prevState => {
      return {
        promo: {
          ...prevState.promo,
          ...value
        }
      }
    }, () => this.props.onChange(this.state.promo));
  }
  changeCTAHandler = (value) => {
    this.setState(prevState => {
      return {
        promo: {
          ...prevState.promo,
          cta: {
            ...prevState.promo.cta,
            ...value
          }
        }
      }
    }, () => this.props.onChange(this.state.promo));
  }
  saveChangesHandler = () => {
    let error = validateForm(this.state.promo);

    this.setState({
      barError: error.barError,
      ctaError: error.ctaError
    });

    if (error.barError.content || error.barError.targetUrl || error.ctaError.title || error.ctaError.targetUrl)
      return false;

    let changedPromo = {
      ...this.state.promo,
      delay: parseInt(this.state.promo.delay, 10)
    };

    this.submitChangedPromo(changedPromo);
  }
  submitChangedPromo = (promo) => {
    savePromo(promo).then(result => {
      if (result.error && 401 === result.error) {
        this.context.easdk.showFlashNotice('Session expired. Re-open this app from the shop admin.', { error: true });
        return false;
      }

      this.context.easdk.showFlashNotice('Changes saved');
    })
    .catch(error => { // eslint-disable-line no-unused-vars
      this.context.easdk.showFlashNotice('Failed to save changes', { error: true })
    });
  }
}

EditPromoForm.propTypes = {
  promo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

EditPromoForm.contextTypes = {
  easdk: PropTypes.object
};

export default EditPromoForm;
