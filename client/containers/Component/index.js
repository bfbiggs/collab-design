import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchComponentData } from './actions';
import ComponentPage from './ComponentPage';

class ComponentContainer extends React.Component {
  componentDidMount() {
    const {
      child,
      components,
      fetchComponentData
    } = this.props;

    if (!components[child.object_id]) {
      fetchComponentData(child.object_id);
    }
  }

  render() {
    return (
      <ComponentPage {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  codePreference: state.componentsReducer.codePreference,
  components: state.componentsReducer.components,
  error: state.componentsReducer.error,
  loading: state.componentsReducer.loading,
});

ComponentContainer.propTypes = {
  child: PropTypes.object.isRequired,
  codePreference: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  error: PropTypes.bool,
  fetchComponentData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ComponentContainer.defaultProps = {
  error: false,
  loading: false,
};

export default connect(
  mapStateToProps,
  { fetchComponentData }
)(ComponentContainer);
