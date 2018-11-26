import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './AppHeader';
import AppFooter from './AppFooter';
import SideNav from '../containers/SideNav';
import Routes from '../containers/Routes';
import { history } from '../store/configureStore';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <React.Fragment>
        <div
          className={
            `docs-main` + `${location === '/' ? ' docs-main--home' : ''}`
          }>
          <Header history={history} />
          <SideNav />
          <Routes />
          <AppFooter />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname,
});

App.propTypes = {
  location: PropTypes.string,
};

export default hot(module)(connect(mapStateToProps)(App));