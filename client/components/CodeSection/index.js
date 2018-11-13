import React from 'react';
import PropTypes from 'prop-types';
import { startCase, toLower } from 'lodash';
import CodeBlock from '../../collab-ui/CodeBlock';
import AsyncComponent from '../AsyncComponent';

class CodeSection extends React.PureComponent {
  static displayName = 'CodeSection';

  render() {
    const { 
      name,
      component,
      example,
      language,
      description,  
     } = this.props;

     const mkTitleCase = str => startCase(toLower(str));

     const rmWhiteSpace = str => str.replace(/[\s-]/g, '');
 
     const componentTitleCase = rmWhiteSpace(
       mkTitleCase(component)
     );

     return (
      <div className="docs-section">
        <h4 className="cui-h4--bold cui-font-color--alternate docs-section__title">
          {mkTitleCase(name)}
        </h4>
        <h5>
          {description}
        </h5>
        <AsyncComponent 
          loader={() => import(`@collab-ui/react/examples/${componentTitleCase}/${rmWhiteSpace(name)}.js`)}
          Placeholder={example}
        />
        <CodeBlock codeType={language}>
          {example}
        </CodeBlock>
      </div>
    );
  }
}

CodeSection.defaultProps = {
  name: '',
  component: '',
  example: '',
  language: '',
  description: '',  
};

CodeSection.propTypes = {
  name: PropTypes.string,
  component: PropTypes.string,
  example: PropTypes.string,
  language: PropTypes.string,
  description: PropTypes.string,
};

export default CodeSection;
