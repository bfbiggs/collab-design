import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import SideNav from '../SideNav';
import config from '../../config';
import DesignTab from '../../components/DesignTab';
import CodeTab from '../../components/CodeTab';
import PageHeader from '../../collab-ui/PageHeader';
import comingSoon from '../../assets/coming-soon.jpg';
import get from 'lodash/get';

class DefaultPage extends React.Component {
  state = {
    content: null, pageHeroImage: null, pageSubTitle: null, pageTitle: null,
  };

  componentDidMount() {
    return fetch(`${config.PAGES_URL}/id/${this.props.item.object_id}`)
    .then(res => res.json())
    .then(response => {
      const page = response;
      console.log(page); // eslint-disable-line no-console
      const { pageHeroImage, pageSubTitle, pageTitle } = get(page, 'acf');
      const content = get(page.content, 'rendered');
      this.setState({
        content, pageHeroImage, pageSubTitle, pageTitle,
      });
    });
  }

  render() {
    const {
      item,
      lead,
      title,
    } = this.props;
    const {
      content, pageHeroImage, pageSubTitle, pageTitle
    } = this.state;

    const id = item.object_id;
    // const page = components[id];

    return (
      <div className="docs-main">
        {!pageTitle ? <PageHeader title={title} lead={lead} textAlign="left" /> : <PageHeader title={pageTitle} lead={pageSubTitle} textAlign="left" />}
        <SideNav hide={false} />
        <div className="docs-content-area">
          {content
            ? <div className="docs-content__column row"><div className="medium-11 columns medium-offset-1" dangerouslySetInnerHTML={{ __html: content }} /></div>
            : <img src={comingSoon} alt="Coming Soon" /> }
        </div>
        {/* {component && (
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
            <div className="docs-content-area">
              <Switch>
                <Route path={`${match.path}/style`} render={props => <DesignTab {...props} sections={component.style} />} />
                <Route path={`${match.path}/usage`} render={props => <DesignTab {...props} sections={component.usage} />} />
                <Route path={`${match.path}/code`} render={props => <CodeTab {...props} sections={component.code && component.code} />} />
                <Redirect exact path={`${match.path}/`} to={`${match.path}/style`} />
              </Switch>
            </div>
          </React.Fragment>
        )} */}
      </div>
    );
  }
}

DefaultPage.propTypes = {
  // child: PropTypes.object.isRequired,
  // components: PropTypes.object.isRequired,
  // error: PropTypes.bool,
  // fetchComponentData: PropTypes.func.isRequired,
  // loading: PropTypes.bool,
  // lead: PropTypes.string,
  // match: PropTypes.object.isRequired,
  // title: PropTypes.string.isRequired,
};

DefaultPage.defaultProps = {
  error: false,
  loading: false,
  lead: null,
};

export default DefaultPage;
