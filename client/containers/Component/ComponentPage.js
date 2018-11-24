import React from 'react';
import PropTypes from 'prop-types';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { Spinner } from '@collab-ui/react';
import DesignTab from '../../components/DesignTab';
import CodeTab from '../../components/CodeTab';
import PageHeader from '../../collab-ui/PageHeader';

class ComponentPage extends React.Component {
  render() {
    const {
      child,
      codePreference,
      components,
      loading,
      match,
    } = this.props;

    const component = components[child.object_id];

    const verifyCodeExamples = () => {
      const findCodeExamples = sections => (
        sections.reduce(
          (agg, section) => {

            if(
              agg
                || section.variations.core.example
                || section.variations.react.example
                || section.variations.angular.example
                || section.variations.angularjs.example
            ) {
              return true;
            } else return false;


          }, false)
        );

      return component
        && component.code
        && component.code.sections
        && findCodeExamples(component.code.sections);
    };

    const hasCodeExamples = verifyCodeExamples();

    const getDefaultTab = () => {
      return component.style ? `${match.path}style`
              : component.usage ? `${match.path}usage`
                : hasCodeExamples ? `${match.path}code`
                  : match.path;
    };

    return (
      !component
        ? <PageHeader textAlign="left" />
        : (
          <React.Fragment>
            <PageHeader title={component.displayName} lead={component.description} textAlign="left" />
            <div className="cui-button-group cui-button-group--blue">
              {
                component.style &&
                  <NavLink className="cui-button cui-button--36" activeClassName='active' to={`${match.url}/style`}>
                    Style
                  </NavLink>
              }
              {
                component.usage &&
                  <NavLink className="cui-button cui-button--36" activeClassName='active' to={`${match.url}/usage`}>
                    Usage
                  </NavLink>
              }
              {
                hasCodeExamples &&
                  <NavLink
                    className="cui-button cui-button--36"
                    activeClassName='active'
                    to={`${match.url}/code`}
                  >
                    Code
                  </NavLink>
                }
            </div>
            <div className="docs-content-area docs-content-area--with-pagenav">
              {loading
                ? <Spinner />
                : <Switch>
                    <Route path={`${match.path}style`} render={props => <DesignTab {...props} sections={component.style} />} />
                    <Route path={`${match.path}usage`} render={props => <DesignTab {...props} sections={component.usage} />} />
                    <Route path={`${match.path}code`} render={props => hasCodeExamples && <CodeTab {...props} sections={component.code && component.code} codePreference={codePreference} />} />
                    <Redirect exact path={`${match.path}`} to={getDefaultTab()} />
                  </Switch>
              }
            </div>
          </React.Fragment>
        )
    );
  }
}

ComponentPage.propTypes = {
  child: PropTypes.object.isRequired,
  codePreference: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired,
  error: PropTypes.bool,
  fetchComponentData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  match: PropTypes.object.isRequired,
};

ComponentPage.defaultProps = {
  error: false,
  loading: false,
};

export default ComponentPage;
