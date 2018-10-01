import React from 'react';
import PropTypes from 'prop-types';
import SubSection from '../../components/SubSection';

class Section extends React.PureComponent {
  static displayName = 'Section';

  render() {
    const { section } = this.props;
    return (
      <div className="docs-section">
        <h4 className="cui-h4--bold cui-font-color--alternate" id={section.sectionId}>
          {section.sectionTitleText}
        </h4>
        {/* eslint-disable react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: section.sectionBodyContent }} />
        {/* eslint-enable react/no-danger */}
        <img src={section.sectionImage} alt={section.sectionImageDescription} />
        <div>{section.sectionImageDescription}</div>
        {section.subSections &&
          section.subSections.map((subSection, idx) => {
            return <SubSection subSection={subSection} key={idx} />;
          })}
      </div>
    );
  }
}

Section.propTypes = {
  section: PropTypes.object,
};

Section.defaultProps = {};

export default Section;
