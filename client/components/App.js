import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import Header from './AppHeader';
import SideNav from '../containers/SideNav';
import Routes from '../containers/Routes';
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div className={
        `docs-main` +
        `${(location === '/' ? ' docs-main--home' : '')}`
      }>
        <Header />
        <SideNav />
        <Routes />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.routing.location.pathname
});

App.propTypes = {
  location: PropTypes.string
};

export default hot(module)(connect(mapStateToProps)(App));
