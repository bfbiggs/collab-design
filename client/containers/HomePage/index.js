import React from 'react';
import { Link } from 'react-router-dom';

import Hero from '../../collab-ui/Hero';
import config from '../../config';

class HomePage extends React.PureComponent {

  state = {
      pageHeroImage: '',
      pageSubTitle: '',
      pageTitle: '',
      homeSections: [],
  }

  componentDidMount = () => {
    return fetch(`${config.PAGES_URL}/name/homepage`)
    .then(res => res.json())
    .then(response => {
      const homepage = response;
      console.log(homepage); // eslint-disable-line no-console
      const { pageHeroImage, pageSubTitle, pageTitle, homeSections, } = homepage.acf;
      this.setState({
        pageHeroImage, pageSubTitle, pageTitle, homeSections,
      });
    });
  }

  render () {
    const { pageHeroImage, pageSubTitle, pageTitle, homeSections } = this.state;

    return (
      <div className="docs-home-page">
        <Hero title={pageTitle} description={pageSubTitle} textAlign="center" image={pageHeroImage} className="docs-hero--home"/>

        <div className="docs-home-sections">
          {homeSections && homeSections.map((section, idx) => {
            return (
              <section
                className={
                  'cui-landing-section' +
                  (section.imagePosition === 'right'
                    ? ' cui-landing-section--image-right'
                    : ' cui-landing-section--image-left' ) +
                  (section.backgroundColor && ` cui-background-color--${section.backgroundColor}`)
                }
                key={`homeSection-${idx}`}
              >
                <div className="cui-landing-section__container">
                  {section.image && (
                    <div className="cui-landing-section__image">
                      <img src={section.image} alt={section.header}/>
                    </div>
                  )}
                  <div className="cui-landing-section__content">
                    <h2 className="cui-ls-content__header cui-h2--bold">{section.header}</h2>
                    {/* eslint-disable react/no-danger */}
                    {/* <div dangerouslySetInnerHTML={{ __html: section.content }} /> */}
                    {/* eslint-enable react/no-danger */}
                    <div className="cui-ls-content__sub-header">
                      <h4 className="cui-font-color--secondary">{section.content}</h4>
                      {section.ctaText && (
                        <Link className="cui-ls-content__cta cui-h4" to={section.ctaLink}>{section.ctaText}</Link>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    );
  }

}

export default HomePage;
