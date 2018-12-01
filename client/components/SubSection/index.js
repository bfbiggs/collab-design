import React from 'react';
import PropTypes from 'prop-types';

class SubSection extends React.PureComponent {
  static displayName = 'SubSection';

  render() {
    const { subSection } = this.props;
    return (
      <div className="docs-sub-section">
        <h5 className="cui-h4--bold cui-font-color--alternate docs-sub-section__title" id={subSection.subSectionId}>
          {subSection.subSectionTitleText}
        </h5>
        {/* eslint-disable react/no-danger */}
        <div className="docs-sub-section__body" dangerouslySetInnerHTML={{ __html: subSection.subSectionBodyContent }} />
        {/* eslint-enable react/no-danger */}
        <div className="row">
          <div className={`docs-sub-section__image-section medium-${subSection.subSectionImageSize} columns`}>
            <img src={subSection.subSectionImage} alt={subSection.subSectionImageDescription} />
            <div className={`medium-${12 - subSection.subSectionImageSize} columns`}>{subSection.subSectionImageDescription}</div>
          </div>
        </div>
      </div>
    );
  }
}

SubSection.propTypes = {
  subSection: PropTypes.object.isRequired,
};

SubSection.defaultProps = {};

export default SubSection;
