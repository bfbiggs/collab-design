import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';

import fetchRoutes from './actions';
// import getAuthorization from '../../services/user/actions';
import LoginPage from '../../containers/Login';
import NotFoundPage from '../../containers/NotFound';
import ParentPage from '../../containers/ParentPage';
import ComponentOverviewPage from '../../containers/ComponentOverviewPage';
import ComponentPage from '../../containers/ComponentPage';
import HomePage from '../../containers/HomePage';
import DefaultPage from '../../containers/DefaultPageTemplate';
// import PrivateRoute from './PrivateRoute';

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    const { error, loading, routes } = this.props;
    const createRoutes = routes.map((item, idx) => {
      if (item.object_slug === 'components' || item.object_slug === 'style') {
        return [
          item.children.map(child => {
            const childPath = child.path.replace(/\/$/, '');
            if (item.object_slug === child.object_slug) return;
            return [<Route key={`${child.id}`} path={`/${childPath}/`} render={props => <ComponentPage {...props} child={child} />} />];
          }),
        ];
      }
      return [
        <Route key={`${item.id}${idx}`} exact path={`/${item.path}`} render={props => <DefaultPage {...props} page={item} title={item.title} />} />,
        item.children &&
          item.children.map((child, idx) => {
            const childPath = child.path.replace(/\/$/, '');
            return [
              <Route key={`${child.id}${idx}`} exact path={`/${childPath}`} render={props => <DefaultPage {...props} page={child} title={child.title} />} />,
              child.children &&
                child.children.map((grandchild, idx) => {
                  const grandChildPath = grandchild.path.replace(/\/$/, '');
                  return <Route key={`${grandchild.id}${idx}`} exact path={`/${grandChildPath}`} render={props => <ParentPage {...props} title={grandchild.title} />} />;
                }),
            ];
          }),
      ];
    });

    return (
      <Switch>
        <Route key={'home0'} path="/" exact component={HomePage} />
        <Route key={'components0'} path="/components" exact component={ComponentOverviewPage} />
        {routes && (!loading || !error) && createRoutes}
        <Route key={'login0'} path="/login" component={LoginPage} />
        <Route key={'NoMatch0'} component={NotFoundPage} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  routes: state.routesReducer.routes,
  loading: state.routesReducer.loading,
  error: state.routesReducer.error,
});

Routes.propTypes = {
  error: PropTypes.bool,
  fetchRoutes: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  routes: PropTypes.array.isRequired,
};

Routes.defaultProps = {
  error: false,
  loading: false,
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRoutes }
  )(Routes)
);
