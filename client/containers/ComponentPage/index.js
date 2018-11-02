import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from '@collab-ui/react';
import fetchComponentData from './actions';
import DesignTab from '../../components/DesignTab';
import CodeTab from '../../components/CodeTab';
import PageHeader from '../../collab-ui/PageHeader';

class ComponentPage extends React.Component {
  state = {
    component: this.props.components[this.props.child.object_id],
  };

  componentDidMount() {
    const { child, components, fetchComponentData } = this.props;
    if (!components[child.object_id]) return fetchComponentData(child.object_id);
  }

  render() {
    const {
      child,
      components,
      loading,
      lead,
      match,
      title,
    } = this.props;
    const id = child.object_id;
    const component = components[id];

    return (
      <React.Fragment>
        {!component ? <PageHeader title={title} lead={lead} textAlign="left" /> : <PageHeader title={component.pageTitle} lead={component.pageSubTitle} textAlign="left" />}
        {component && (
          <React.Fragment>
            <div className="cui-button-group cui-button-group--blue">
              <NavLink className="cui-button cui-button--36" activeClassName='active' to={`${match.url}/style`}>
                Style
              </NavLink>
              <NavLink className="cui-button cui-button--36" activeClassName='active' to={`${match.url}/usage`}>
                Usage
              </NavLink>
              <NavLink className="cui-button cui-button--36" activeClassName='active' to={`${match.url}/code`}>
                Code
              </NavLink>
            </div>
            <div className="docs-content-area docs-content-area--with-pagenav">
              {loading
                ? <Spinner />
                : <Switch>
                    <Route path={`${match.path}/style`} render={props => <DesignTab {...props} sections={component.style} />} />
                    <Route path={`${match.path}/usage`} render={props => <DesignTab {...props} sections={component.usage} />} />
                    <Route path={`${match.path}/code`} render={props => <CodeTab {...props} sections={component.code && component.code} />} />
                    <Redirect exact path={`${match.path}/`} to={`${match.path}/style`} />
                  </Switch>
              }
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  components: state.componentsReducer.components,
  loading: state.componentsReducer.loading,
  error: state.componentsReducer.error,
});

ComponentPage.propTypes = {
  child: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  error: PropTypes.bool,
  fetchComponentData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  lead: PropTypes.string,
  match: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

ComponentPage.defaultProps = {
  error: false,
  loading: false,
  lead: null,
};

export default connect(
  mapStateToProps,
  { fetchComponentData }
)(ComponentPage);
