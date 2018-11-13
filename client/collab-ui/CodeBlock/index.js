import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.min';

class CodeExample extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const { children, codeType } = this.props;

    return (
      <pre >
        <code className={`language-${codeType}`}>
          {children}
        </code>
      </pre>
    );
  }
}

CodeExample.propTypes = {
  children: PropTypes.string.isRequired,
  codeType: PropTypes.string,
};

CodeExample.defaultProps = {
  children: null,
  codeType: 'jsx'
};

export default CodeExample;
