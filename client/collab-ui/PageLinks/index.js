import React from 'react';
import PropTypes from 'prop-types';
import ScrollSpy from '../ScrollSpy/ScrollSpy';

class PageLinks extends React.Component {

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { scrollY } = window;
    const elm = document.querySelector('.cui-page-links__container');
    const reTop = 288 <= scrollY ? 112 : (400 - scrollY);

    elm.style.top = `${reTop}px`;
    return reTop;
  }


  render() {
    const {
      links,
    } = this.props;

    const filteredLinks = links.filter((link => link.sectionTitleText || link.name));

    const hrefs = filteredLinks.map(link => link.sectionId || link.name);

    const pageLinks = filteredLinks.map((link, i, arr) => (

      <a
        href={link.sectionId ? `#${link.sectionId}` : `#${link.name}`}
        className={
          `${(arr.length > 11 && ' cui-page-links__link--shrink') || ''}`
        }
        key={i}
      >
        {link.sectionTitleText ? link.sectionTitleText : link.name}
      </a>
    ));

    return (
      <ScrollSpy
        items={hrefs}
        activeClassName="cui-page-links__link--active"
        defaultClassName="cui-page-links__link"
        className="cui-page-links__container"
        componentTag='div'
      >
        {pageLinks}
      </ScrollSpy>
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

ScrollSpy.displayName = 'PageLinks';

export default PageLinks;