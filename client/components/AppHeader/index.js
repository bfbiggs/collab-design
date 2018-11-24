import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  // List,
  ListItem,
  Topbar,
  TopbarNav,
  // TopbarMobile,
  TopbarRight,
  // Popover,
  // Button,
} from '@collab-ui/react';
import logo from '../../assets/collaboration-design.svg';
import getUser from '../../services/user/actions';

class AppHeader extends Component {
  state = {
    hideNav: true,
  };

  componentDidMount() {
    this.props.getUser(location);
    this.showNav(this.props.path);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) {
      this.showNav(this.props.path);
    }
  }

  logoutUser = () => {
    console.log('log out user'); // eslint-disable-line no-console
    // this.props.actions.logoutUser();
  };

  showNav = path => {
    this.setState({
      hideNav: path === '/' ? false : true,
    });
  };

  getDefaultAvatar = () => {};

  render() {
    const { photo } = this.props;
    const { hideNav } = this.state;
    // const logoIcon = <i className="icon icon-cisco-logo" />;
    const wordMark = <img src={logo} alt="Collaboration Design System" />;
    // const getAvatar = () => {
    //   const number = Math.floor(Math.random() * 101);
    //   const gender = Math.random() >= 0.5 ? 'women' : 'men';
    //   return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
    // };
    const navItems = (
      <Fragment>
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/design-principles" activeClassName={'active'}>
              Design Principles
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/guidelines" activeClassName={'active'}>
              Guidelines
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/style" activeClassName={'active'}>
              Style
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/components" activeClassName={'active'}>
              Components
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/resources" activeClassName={'active'}>
              Resources
            </NavLink>
          }
        />
      </Fragment>
    );
    // const topBarPopoverContent = (
    //   <List>
    //     <ListItem onClick={this.logoutUser}>Log out</ListItem>
    //   </List>
    // );

    const topbarRight = this.props.isAuthenticated ? (
      <div className="cui-top-bar__user">
        {/* <Popover
          direction="bottom-right"
          content={topBarPopoverContent}
          popoverTrigger="Click"
          closeOnClick> */}
        <button className="cui-avatar cui-button--none" aria-haspopup="true" onClick={this.logoutUser}>
          <img className="user-image" src={photo} onError={this.getDefaultAvatar} alt="user" />
        </button>
        {/*</Popover> */}
      </div>
    ) : (
      <div className="cui-top-bar__logged-out">
        <Link to="/login">Log In</Link>
      </div>
    );

    return (
      <Fragment>
        <Topbar color="light" image={wordMark} brandAnchorElement={<NavLink to="/" />} fixed>
          {!hideNav && <TopbarNav>{navItems}</TopbarNav>}
          {/* <TopbarNav>{navItems}</TopbarNav> */}
          {/* <TopbarNav>Hello</TopbarNav> */}
          <TopbarRight>{topbarRight}</TopbarRight>
        </Topbar>
      </Fragment>
    );
  }
}

AppHeader.propTypes = {
  getUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  path: PropTypes.string,
  photo: PropTypes.string,
};

AppHeader.defaultProps = {
  isAuthenticated: false,
  path: '',
  photo: null,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.user.isAuthenticated,
    photo: state.user.photo,
    path: state.routing.location.pathname,
  };
}

export default connect(
  mapStateToProps,
  { getUser }
)(AppHeader);
