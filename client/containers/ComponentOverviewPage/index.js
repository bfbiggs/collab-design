import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchInput, Spinner } from '@collab-ui/react';
import { fetchComponentsData, filterComponentsData } from './actions';
import ComponentItem from '../../components/ComponentItem';
import PageHeader from '../../collab-ui/PageHeader';

class ComponentOverviewPage extends React.Component {
  componentDidMount() {
    this.props.fetchComponentsData();
  }

  renderComponentItems = () => {
    const { components, keyword } = this.props;

    return components.children.map((itm, idx) => {
      const name = itm.displayName.toLowerCase();
      const reg = new RegExp(keyword);
      if (keyword == '' || reg.test(name)) {
        return (
          <li
            key={idx}
          >
            <ComponentItem
              route={itm.path}
              thumbnail={itm.thumbnailImage}
              title={itm.displayName}
            />
          </li>
        );
      }
    });
  };

  handleSearchInput = e => {
    const value = e.target.value;
    this.props.filterComponentsData(value);
  };

  render() {
    const { components, loading } = this.props;

    return (
      <React.Fragment>
        <PageHeader
          title={components.displayName}
          lead={components.description}
          textAlign="left"
        />
        <div className="docs-content-area docs-component-overview">
          {loading ? (
            <div className="docs-component-overview__spinner">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              <div className="docs-component-overview__top">
                <SearchInput
                  name="filterSearchInput"
                  htmlId="filterSearchInput"
                  type="pill"
                  onChange={this.handleSearchInput}
                />
              </div>
              <ul className="docs-component-overview__component-list">
                {this.renderComponentItems()}
              </ul>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state.componentOverviewReducer,
  };
};

ComponentOverviewPage.propTypes = {
  keyword: PropTypes.string,
  components: PropTypes.object,
  error: PropTypes.string,
  fetchComponentsData: PropTypes.func.isRequired,
  filterComponentsData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ComponentOverviewPage.defaultProps = {
  error: null,
  loading: false,
};

export default connect(
  mapStateToProps,
  { fetchComponentsData, filterComponentsData }
)(ComponentOverviewPage);
