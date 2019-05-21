import React from 'react';
import PropTypes from 'prop-types';
import { FormLayout, Checkbox, Select, TextField } from '@shopify/polaris';
import ColorPicker from '../color-picker';
import { positionOptions, delayOptions } from './constants';

class MessageFormSection extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { active, content, targetUrl, position, delay, color, bgColor } = this.props.promo;
    let error = this.props.validationError;

    return (
      <FormLayout>
        <Checkbox name="promo_active"
          label="Display this promo bar in my store"
          checked={active} value={active ? 'on' : ''} onChange={this.statusChangeHandler}
        />
        <FormLayout.Group>
          <TextField type="text" name="promo_content" maxLength="256"
            label="Content" autoFocus={true} autoComplete={false}
            value={content} error={error.content} onChange={this.contentChangeHandler}
          />
          <TextField type="url" name="promo_target" maxLength="256"
            label="Target URL for clickable message" placeholder="http://www.example.com"
            value={targetUrl} error={error.targetUrl} onChange={this.targetUrlChangeHandler}
          />
        </FormLayout.Group>
        <FormLayout.Group>
          <div className="color-picker-group">
            <ColorPicker id="text_color_picker" label="Text color" color={color} onChange={this.changeTextColorHandler} />
            <ColorPicker id="text_bgcolor_picker" label="Background color" color={bgColor} onChange={this.changeBackgroundColorHandler} />
          </div>
          <div></div>
        </FormLayout.Group>
        <FormLayout.Group>
          <Select name="promo_position" label="Position"
            options={positionOptions} value={position} onChange={this.positionChangeHandler}
          />
          <Select name="promo_delay" label="Delay (seconds)"
            options={delayOptions} value={delay} onChange={this.delayChangeHandler}
          />
        </FormLayout.Group>
      </FormLayout>
    );
  }
  statusChangeHandler = (value) => {
    this.props.onChange({ active: value });
  }
  contentChangeHandler = (value) => {
    this.props.onChange({ content: value });
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
  positionChangeHandler = (value) => {
    this.props.onChange({ position: value });
  }
  delayChangeHandler = (value) => {
    this.props.onChange({ delay: value });
  }
}

MessageFormSection.propTypes = {
  promo: PropTypes.object.isRequired,
  validationError: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MessageFormSection;
