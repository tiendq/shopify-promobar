import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
  constructor(props) {
    super();

    this.state = {
      active: false,
      color: props.color
    };
  }
  render() {
    return (
      <div className="color-picker">
        <div className="Polaris-Labelled__LabelWrapper">
          <div className="Polaris-Label">
            <label htmlFor={this.props.id} className="Polaris-Label__Text">{this.props.label}</label>
          </div>
        </div>
        <div className="picker-container">
          <button type="button" id={this.props.id} className="Polaris-Button color-swatch-outer" onClick={this.clickColorHandler}>
            <span style={{ background: this.state.color }} className="Polaris-Button__Content color-swatch-inner" />
          </button>
          {this.state.active && this.renderPopover()}
        </div>
      </div>
    );
  }
  renderPopover = () => {
    return (
      <div className="picker-popover">
        <div className="picker-overlay" onClick={this.clickOverlayHandler}></div>
        <SketchPicker color={this.state.color} disableAlpha={true} onChangeComplete={this.changeColorCompleteHandler} />
      </div>
    );
  }
  clickColorHandler = () => {
    this.setState({
      active: true
    });
  }
  clickOverlayHandler = (event) => {
    // Need stopPropagation because preventDefault only works with elements have onClick built in.
    // DIV does not have onClick handler by default.
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      active: false
    });
  }
  changeColorCompleteHandler = (color) => {
    this.setState({
      color: color.hex
    });

    this.props.onChange(color.hex);
  }
}

ColorPicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColorPicker;
