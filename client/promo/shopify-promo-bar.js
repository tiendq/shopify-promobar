import React from 'react';
import PropTypes from 'prop-types';

class ShopifyPromoBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      visible: true
    };
  }
  componentDidMount = () => {
    // Delay a bit before making promo bar visible to see smooth animation.
    // Animation won't work as expected at render time.
    setTimeout(() => {
      this.setState({
        active: true
      })
    }, 100);
  }
  render() {
    let style = this.state.visible ? {
      color: this.props.promo.color,
      backgroundColor: this.props.promo.bgColor
    } : {
      display: 'none'
    };

    return (
      <div style={style} className={this.state.active ? 'promo-bar active' : 'promo-bar' }>
        <div className="promo-content">
          {this.renderPromoContent(this.props.promo)}
        </div>
        <div className="dismiss-icon" onClick={this.dismissClickHandler}>
          <svg style={{ fill: this.props.promo.color }} className="dismiss-svg-icon" width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z" fillRule="evenodd"/>
          </svg>
        </div>
      </div>
    );
  }
  dismissClickHandler = () => {
    this.setState({
      active: false
    });

    // Remove the bar completely from screen space so it no longer covers lower elements.
    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, 500);
  }
  renderPromoContent = ({ content, targetUrl, color, cta }) => {
    if (targetUrl) {
      let target = this.props.previewMode ? '_blank' : '_self';

      return [
        <span key="text" className="promo-text clickable">
          <a href={targetUrl} style={{ color }} target={target}>{content}</a>
        </span>,
        this.renderCTAButton(cta)
      ];
    } else {
      return [
        <span key="text" className="promo-text">{content}</span>,
        this.renderCTAButton(cta)
      ];
    }
  }
  renderCTAButton = ({ enabled, title, targetUrl, color, bgColor }) => {
    if (!enabled || 0 === title.trim().length)
      return null;

    let style = {
      color,
      backgroundColor: bgColor
    };

    let target = this.props.previewMode ? '_blank' : '_self';
    let url = targetUrl.trim();

    return <a key="cta" href={url.length > 0 ? url : 'javascript:void(0);'} style={style} target={target} className="promo-cta">{title}</a>;
  }
}

ShopifyPromoBar.propTypes = {
  promo: PropTypes.object.isRequired,
  previewMode: PropTypes.bool
};

export default ShopifyPromoBar;
