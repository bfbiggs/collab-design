import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Header from './AppHeader';
import SideNav from '../containers/SideNav';
import Routes from '../containers/Routes';

class App extends Component {
  render() {
    return (
      <div className="cui-main">
        <Header />
        {/* <SideNav /> */}
        <Routes />
      </div>
    );
  }
}

export default hot(module)(App);
