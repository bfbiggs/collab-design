import React from 'react';
import PropTypes from 'prop-types';
import { startCase, toLower } from 'lodash';
import CodeBlock from '../../collab-ui/CodeBlock';

class CodeTab extends React.PureComponent {
  static displayName = 'CodeTab';

  renderComponent(component, section) {
    try {
      return require(`../../../node_modules/@collab-ui/react/examples/${component}/${section}.js`).default;
    } catch (e) {
      return null;
    }
  }

  render() {
    const { sections } = this.props;

    const mkTitleCase = str => startCase(toLower(str));

    const rmWhiteSpace = str => str.replace(/\s/g, '');

    const componentTitleCase = rmWhiteSpace(
      mkTitleCase(sections.name)
    );

    const codeSections = sections.sections;

    return (
      <React.Fragment>
        <div className="docs-content__column">
          {
            codeSections
            &&
            codeSections.map((section, idx) => {
              const Component = this.renderComponent(componentTitleCase, section.name);
              
              return (
                <div className="docs-section" key={idx}  style={{ marginBottom: '17px' }}>
                  <h4 className="cui-h4--bold cui-font-color--alternate" id={section.section}>
                    {section.name}
                  </h4>
                  {
                    Component 
                    && <Component />
                  }
                  <h5 style={{ margin: '12px 0 48px 0' }}>
                    {section.description}
                  </h5>
                  <CodeBlock>
                    {
                      section.variations.react
                        && section.variations.react[0]
                        && section.variations.react[0].example 
                        || 'No'
                    }
                  </CodeBlock>
                </div>
              );
            })
          }
          {
            sections.props 
            && sections.props.react.length >= 0 
            && (
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
            )
          }
        </div>
        <div className="docs-content__nav">
          {
            codeSections
            && codeSections.map((section, idx) => (
              <li key={`${section.section}-${idx}`}>
                <a href={`#${section.section}`}>{section.name}</a>
              </li>
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}

CodeTab.propTypes = {
  sections: PropTypes.shape({}),
};

export default CodeTab;
