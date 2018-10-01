import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';

class DesignTab extends React.PureComponent {
  static displayName = 'DesignTab';

  render() {
    const { sections } = this.props;
    return (
      <React.Fragment>
        <div className="docs-content__column">
          {sections &&
            sections.map((section, idx) => {
              return <Section section={section} key={idx} />;
            })}
        </div>

        <div className="docs-content__nav">
          {sections &&
            sections.map(section => {
              return (
                <li key={section.sectionId}>
                  <a href={`#${section.sectionId}`}>{section.sectionTitleText}</a>
                </li>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

DesignTab.propTypes = {
  sections: PropTypes.array.isRequired,
};

export default DesignTab;
