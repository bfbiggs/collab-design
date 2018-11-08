import React from 'react';
import PropTypes from 'prop-types';

class AsyncComponent extends React.Component {
  state = { Component: null };

  async componentDidMount() {
    try {
      const Component = await this.props.loader();

      this.setComponent(Component.default);
    } catch (e) {
      return;
    }
  }

  setComponent = Component => {
    this.setState({ Component });
  }

  render() {
    const { Component } = this.state;
    const { Placeholder, ...props } = this.props;

    return Component ? <Component {...props} /> : Placeholder;
  }
}

AsyncComponent.defaultProps ={
  Placeholder: <div>Not Found</div>
}

AsyncComponent.propTypes = {
  loader: PropTypes.func.isRequired,
  Placeholder: PropTypes.node,
};

export default AsyncComponent;