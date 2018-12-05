import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import {
  Icon,
  List,
  ListItem,
  ListItemSection,
  SideNav,
} from '@collab-ui/react';

class SideNavContainer extends React.PureComponent {
  render() {
    const {
      // error,
      // loading,
      routes,
    } = this.props;

    const createNavLinks = routes.map((item, idx) => {
      return item.children
        ? (
          <SideNav
            key={`${item.id}-${idx}`}
            navSectionNode={
              <ListItem className='cui-list-item--primary'>
                {
                  item.classes
                  && 
                  <ListItemSection position='left'>
                    <Icon name={item.classes} />
                  </ListItemSection>
                }
                <ListItemSection position='center'>
                  <h5 className='cui-font-color--alternate cui-h5--bold'>
                    {item.title}
                  </h5>
                </ListItemSection>
              </ListItem>
            }
            expandable
            expanded={false}
          >
            <List>
              {
                item.children.map((child, childIdx) => (
                  child.children
                  ? (
                    <SideNav
                      key={`${child.id}-${childIdx}`}
                      navSectionNode={
                        <ListItem className='cui-list-item--secondary'>
                          <ListItemSection position='left'/>
                          <ListItemSection position='center'>
                            <h6 className='cui-font-color--primary cui-h5--bold'>
                              {child.title}
                            </h6>
                          </ListItemSection>
                        </ListItem>
                      }
                      expandable
                      expanded={false}
                    >
                      <List>
                        {
                          child.children.map((grandchild, grandChildIdx) => (
                            <ListItem
                              className='cui-list-item--tertiary'
                              key={`${grandchild.id}-${grandChildIdx}`}
                              label={grandchild.title}
                              customAnchorNode={
                                <NavLink 
                                  activeClassName='cui-active-nav'
                                  className='cui-body-small cui-font-color--primary'
                                  to={`/${grandchild.path}`} 
                                />
                              }
                              type={36}
                            />
                          )
                          )
                        }
                      </List>
                    </SideNav>
                  ) : (
                    <ListItem
                      key={`${child.id}-${idx}`}
                      customAnchorNode={
                        <NavLink 
                         activeClassName='cui-active-nav'
                         to={`/${child.path}`} 
                         //Only make Overview Pages exact matches
                         {...!child.path.match(/\//g) && { exact: true }}
                        />
                      }
                      type={36}
                      className='cui-list-item--secondary'
                    >
                      <h6 className='cui-font-color--primary cui-h5--bold'>{child.title}</h6>
                    </ListItem>
                  )
                ))
              }
            </List>
          </SideNav>
        )
        :
        (
          <ListItem
            key={`${item.id}-${idx}`}
            customAnchorNode={
              <NavLink activeClassName='cui-active-nav' to={`/${item.path}`} />
            }
            className='cui-list-item--primary'
          >
            <h5 className='cui-font-color--alternate'>
              {item.title}
            </h5>
          </ListItem>
        );
    });

    const sideNav = (
      <div className='docs-side-nav'>
        <SideNav>
          <List>{createNavLinks}</List>
        </SideNav>
      </div>
    );

    return sideNav;
  }
}

const mapStateToProps = state => ({
  error: state.routesReducer.error,
  loading: state.routesReducer.loading,
  routes: state.routesReducer.routes,
});

SideNavContainer.propTypes = {
  error: PropTypes.bool,
  hide: PropTypes.bool,
  loading: PropTypes.bool,
  routes: PropTypes.array.isRequired,
};

SideNavContainer.defaultProps = {
  error: false,
  hide: true,
  loading: false,
};

export default withRouter(
  connect(mapStateToProps)(SideNavContainer)
);
