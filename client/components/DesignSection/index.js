import React from 'react';
import PropTypes from 'prop-types';
import SubSection from '../../components/SubSection';

class DesignSection extends React.PureComponent {
  static displayName = 'Section';

  render() {
    const { section } = this.props;
    return (
      <div className="docs-section">
        <h4 className="cui-h4--bold cui-font-color--alternate docs-section__title" id={section.sectionId}>
          {section.sectionTitleText}
        </h4>
        {/* eslint-disable react/no-danger */}
        <div className="docs-section__body" dangerouslySetInnerHTML={{ __html: section.sectionBodyContent }} />
        {/* eslint-enable react/no-danger */}
        {
          section.sectionImage
          && (
            <div
              className={
                'flex-row' +
                `${section.sectionImagePosition && ` flex-row--${section.sectionImagePosition}` || ''}`
              }>
              <div className={`medium-${section.sectionImageSize} columns`} >
                <img src={section.sectionImage} alt={section.sectionImageDescription} />
              </div>
              {section.sectionImageDescription && <div className={`medium-${12 - section.sectionImageSize} columns`}>{section.sectionImageDescription}</div>
              }
            </div>
          )
        }
        {section.subSections &&
          section.subSections.map((subSection, idx) => {
            return <SubSection subSection={subSection} key={idx} />;
          })}
      </div>
    );
  }
}

DesignSection.propTypes = {
  section: PropTypes.object,
};

DesignSection.defaultProps = {};

export default DesignSection;
