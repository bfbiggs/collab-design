import React from 'react';
import PropTypes from 'prop-types';
import CodeBlock from '../../collab-ui/CodeBlock';
// import PropTypes from 'prop-types';

class CodeTab extends React.PureComponent {
  static displayName = 'CodeTab';

  render() {
    const { sections } = this.props;
    const codeSections = sections.sections;

    return (
      <React.Fragment>
        <div className="docs-content__column">
          {codeSections &&
            codeSections.map((section, idx) => {
              return (
                <div className="docs-section" key={idx}  style={{ marginBottom: '17px' }}>
                  <h4 className="cui-h4--bold cui-font-color--alternate" id={section.section}>
                    {section.name}
                  </h4>
                  <h5 style={{ margin: '12px 0 48px 0' }}>
                    {section.description}
                  </h5>
                  <CodeBlock>
                    {section.examples.react && section.examples.react[0].example || 'No'}
                  </CodeBlock>
              </div>
              );
            })}
            {
              sections.props && sections.props.react.length >= 0 &&
              <div className="docs-section docs-grid">
                <h4 className="cui-h4--bold cui-font-color--alternate" id={sections.name + 'Props'}  style={{ marginBottom: '12px' }}>
                  Props
                </h4>
                <div className='docs-grid__row'>
                  <div className='docs-grid__cell'>Prop</div>
                  <div className='docs-grid__cell'>PropType</div>
                  <div className='docs-grid__cell'>Required</div>
                  <div className='docs-grid__cell'>Default</div>
                  <div className='docs-grid__cell'>Description</div>
                </div>
                {
                  sections.props.react.map((prop, idx) => {
                    return (
                      <div className="docs-grid__row" key={`${prop.name}-${idx}`}>
                        <div className='docs-grid__cell'>{prop.name}</div>
                        <div className='docs-grid__cell'>{prop.type}</div>
                        <div className='docs-grid__cell'>{prop.required}</div>
                        <div className='docs-grid__cell'>{prop.default}</div>
                        <div className='docs-grid__cell'>{prop.description}</div>
                      </div>
                    );
                  })
                }
              </div>
            }
        </div>
        <div className="docs-content__nav">
          {codeSections &&
            codeSections.map(section => {
              return (
                <li key={section.section}>
                  <a href={`#${section.section}`}>{section.name}</a>
                </li>
              );
            })}
        </div>
      </React.Fragment>
    );
  }
}

CodeTab.propTypes = {
  sections: PropTypes.shape({}),
};

export default CodeTab;
