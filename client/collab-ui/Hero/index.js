import React from 'react';
import PropTypes from 'prop-types';

class Hero extends React.PureComponent {
  static displayName = 'Hero';

  render() {
    const {
      title,
      description,
      image,
      textAlign,
      textColor,
      color,
    } = this.props;
    const leadElement = () => {
      return description ? <h4 className="cui-hero__lead cui-font-color--secondary">{description}</h4> : '';
    };

    return (
      <div
        className={
          'hero ' +
          (textAlign === 'center' ? 'text-center' : 'cui-hero--fluid') +
          ' ' +
          (textAlign === 'left' ? 'cui-page-header--left' : '') +
          ' ' +
          (textColor === 'light' ? 'cui-hero--dark' : '')
        }
        style={{ backgroundColor: color, backgroundImage: `url(${image})` }}>
        <div
          className={
            'cui-page-header__container ' +
            (textAlign === 'left' ? 'cui-page-header--left' : '')
          }>
        {/* eslint-disable react/no-danger */}
        <h1 className="cui-hero__title cui-font-color--alternate cui-h1--bold" dangerouslySetInnerHTML={{ __html: title }} />
        {/* eslint-enable react/no-danger */}
          {leadElement()}
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  textAlign: PropTypes.string,
  textColor: PropTypes.string,
  color: PropTypes.string,
};

Hero.defaultProps = {
  description: '',
  image: '',
  textAlign: '',
  textColor: '',
  color: '',
};

export default Hero;
