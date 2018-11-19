import React from 'react';
import PropTypes from 'prop-types';

export default class PageLinks extends React.Component {
  state = {
    clickedIdx: 0,
  };

  selectLink = i => {
    this.setState({
      clickedIdx: i,
    });
  };

  render() {
    const {
      className,
      links,
    } = this.props;

    const { clickedIdx } = this.state;

    const pageLinks = links.map((link, i) => (
      <a
        href={link.sectionId ? `#${link.sectionId}` : `#${link.section}`}
        className={
          'cui-page-links__link' +
          `${(clickedIdx === i && ' cui-page-links__link--active') || ''}`
        }
        onClick={() => this.selectLink(i)}
        key={i}
      >
        {link.sectionTitleText ? link.sectionTitleText : link.name}
      </a>
    ));

    return (
      <div
        className={
          'cui-page-links__container' +
          `${(className && ` ${className}`) || ''}`
        }
      >
        {pageLinks}
      </div>
    );
  }
}

PageLinks.propTypes = {
  /** @prop Optional css class string | '' */
  className: PropTypes.string,
  /** @prop the page links array with titles */
  links : PropTypes.array,
  /** @prop Set onClick on link */
  onClick: PropTypes.func,
};

PageLinks.defaultProps = {
  className: '',
  links: [],
  onClick: null,
};
