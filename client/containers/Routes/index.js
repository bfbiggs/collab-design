import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, withRouter, Switch } from 'react-router-dom';

import fetchRoutes from './actions';
// import getAuthorization from '../../services/user/actions';
import LoginPage from '../../containers/Login';
import NotFoundPage from '../../containers/NotFound';
import ParentPage from '../../containers/ParentPage';
import Component from '../../containers/Component';
import ComponentOverviewPage from '../../containers/ComponentOverviewPage';
import Overview from '../../containers/Overview';
import HomePage from '../../containers/HomePage';
import DefaultPage from '../../containers/DefaultPageTemplate';
// import PrivateRoute from './PrivateRoute';

class Routes extends React.Component {
  componentDidMount() {
    this.props.fetchRoutes();
  }

  render() {
    const { 
      error,
      loading, 
      routes
    } = this.props;

    const createRoutes = routes.map((item, idx) => {
      if (['components', 'style'].includes(item.object_slug)) {

        return [
          item.object_slug === 'style' && 
          <Route
            key='style'
            path='/style'
            exact
            render={props => <Overview {...props} child={item} id={item.object_id} title={item.title} />}
          />,
          item.children.map(child => {
            if (item.object_slug === child.object_slug) return;
            const childPath = child.path.replace(/\/$/, '');

            return (
              <Route
                key={`${child.id}`}
                path={`/${childPath}/`}
                render={props => <Component {...props} child={child} />} 
              />
            );
          })    
        ];
      }

      return [
        <Route
          exact
          key={`${item.id}-${idx}`}
          path={`/${item.path}`}
          render={props => (
            <Overview 
              child={item}
              id={item.object_id}
              title={item.title} 
              {...props}
            />
          )}
        />,
        item.children &&
        item.children.map((child, idx) => {
          const childPath = child.path.replace(/\/$/, '');

          return [
            <Route
              exact
              key={`${child.id}-${idx}`}
              path={`/${childPath}`}
              render={props => (
                <DefaultPage
                  page={child}
                  title={child.title}
                  {...props}
                />
              )} 
            />,
            child.children &&
            child.children.map((grandchild, idx) => {
              const grandChildPath = grandchild.path.replace(/\/$/, '');
                  
                return (
                  <Route
                    exact
                    key={`${grandchild.id}-${idx}`}
                    path={`/${grandChildPath}`}
                    render={props => <ParentPage {...props} title={grandchild.title} />} 
                  />
                );
            })
          ];
        })
      ];
    });

    return (
      <Switch>
        <Route key='home-0' path='/' exact component={HomePage} />
        <Route key='components-0' path='/components' exact component={ComponentOverviewPage} />
        {routes && (!loading || !error) && createRoutes}
        <Route key='login-0' path='/login' component={LoginPage} />
        <Route key='no-match-0' component={NotFoundPage} />
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
