import React from 'react';
import PropTypes from 'prop-types';

class SubSection extends React.PureComponent {
  static displayName = 'SubSection';

  render() {
    const { subSection } = this.props;
    return (
      <div className="docs-sub-section row">
        <div className={`medium-${12 - subSection.subSectionImageSize} columns`}>
          <h5 className="cui-h5--bold cui-font-color--alternate" id={subSection.subSectionId}>
            {subSection.subSectionTitleText}
          </h5>
          {/* eslint-disable react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: subSection.subSectionBodyContent }} />
          {/* eslint-enable react/no-danger */}
        </div>
        <div className={`docs-sub-section__image-section medium-${subSection.subSectionImageSize} columns`}>
          <img src={subSection.subSectionImage} alt={subSection.subSectionImageDescription} />
          <div>{subSection.subSectionImageDescription}</div>
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
