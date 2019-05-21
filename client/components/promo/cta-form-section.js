import React from 'react';
import PropTypes from 'prop-types';
import { FormLayout, Checkbox, TextField } from '@shopify/polaris';
import ColorPicker from '../color-picker';

class CTAFormSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { enabled, title, targetUrl, color, bgColor } = this.props.promo.cta;
    let error = this.props.validationError;

    return (
      <FormLayout>
        <Checkbox name="enabled_cta" label="Include a CTA button"
          checked={enabled} value={enabled ? 'on' : ''} onChange={this.statusChangeHandler}
        />
        <FormLayout.Group>
          <TextField type="text" name="cta_title" maxLength="64"
            label="Title" autoComplete={false}
            value={title} error={error.title} onChange={this.titleChangeHandler}
          />
          <TextField type="url" name="cta_url" maxLength="256"
            label="Target URL" placeholder="http://www.example.com"
            value={targetUrl} error={error.targetUrl} onChange={this.targetUrlChangeHandler}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <div className="color-picker-group">
            <ColorPicker id="cta_text_color" label="Text color" color={color} onChange={this.changeTextColorHandler} />
            <ColorPicker id="cta_bgcolor" label="Background color" color={bgColor} onChange={this.changeBackgroundColorHandler} />
          </div>
          <div></div>
        </FormLayout.Group>
      </FormLayout>
    );
  }
  statusChangeHandler = (value) => {
    this.props.onChange({ enabled: value });
  }
  titleChangeHandler = (value) => {
    this.props.onChange({ title: value });
  }
  targetUrlChangeHandler = (value) => {
    this.props.onChange({ targetUrl: value });
  }
  changeTextColorHandler = (value) => {
    this.props.onChange({ color: value });
  }
  changeBackgroundColorHandler = (value) => {
    this.props.onChange({ bgColor: value });
  }
}

CTAFormSection.propTypes = {
  promo: PropTypes.object.isRequired,
  validationError: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CTAFormSection;
