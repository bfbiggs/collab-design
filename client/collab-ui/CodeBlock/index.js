import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js/lib/highlight';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage(`javascript`, javascript);
hljs.registerLanguage(`xml`, xml);

// This way is easy, but adds 170K gzipped to bundle since all langs are included.
// import Highlight from 'react-highlight';

class CodeExample extends React.Component {
  componentDidMount() {
    hljs.initHighlightingOnLoad();
    hljs.highlightBlock(this.element);
  }

  render() {

    return (
      <pre>
        <code  
          ref={ref => this.element = ref}
        >
          {this.props.children}
        </code>
      </pre>
    );
  }
}

CodeExample.propTypes = {
  children: PropTypes.string.isRequired,
};

CodeExample.defaultProps = {
  children: null,
};

export default CodeExample;
