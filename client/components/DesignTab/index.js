import React from 'react';
import PropTypes from 'prop-types';
import DesignSection from '../DesignSection';

class DesignTab extends React.PureComponent {
  static displayName = 'DesignTab';

  render() {
    const { sections } = this.props;

    return (
      <React.Fragment>
        <div className="docs-content__column">
          {
            sections
            && sections.map((section, idx) => (
              <DesignSection section={section} key={`${section}-${idx}`} />
            ))
            || 'Coming Soon'
          }
        </div>
        <div className="docs-content__nav">
          {
            sections
            && sections.map(section => (
              <li key={section.sectionId}>
                <a href={`#${section.sectionId}`}>{section.sectionTitleText}</a>
              </li>
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}

DesignTab.propTypes = {
  sections: PropTypes.array,
};

export default DesignTab;
