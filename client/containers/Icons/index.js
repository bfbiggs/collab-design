import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SearchInput } from '@collab-ui/react';
import fetchIcons from './actions';
import IconsList from './IconsList';
import IconModal from './IconModal';
import reduce from 'lodash/reduce';

class IconsContainer extends React.Component {
  state = {
    icons: this.props.icons,
    currentIcon: null,
    isModalOpen: false,
  };

  componentDidMount() {
    const { icons, fetchIcons } = this.props;
    if ( icons.length < 1 ) return fetchIcons();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.icons !== this.props.icons) {
      this.setIconsList(this.props.icons);
    }
  }

  setIconsList(icons) {
    this.setState({
      icons,
    });
  }

  openModal = icon => {
    this.setState({ isModalOpen: true, currentIcon: icon });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  filterIcons = input => {
    const icons = [...this.props.icons];
    const normalizedInput = input.toLowerCase();
    const filteredList = reduce(icons, (agg, icon) => {
      const sizes = Object.keys(icon.sizes);
      const colors = Object.keys(icon.colors);
      const tags = icon.tags;

      return (
        sizes.includes(normalizedInput)
        || colors.includes(normalizedInput)
        || icon.name.includes(normalizedInput)
        || tags.includes(normalizedInput)
      )
        ? agg.concat(icon)
        : agg;
    }, []);

    this.setState({ icons: filteredList });
  };

  handleSearchChange = event => {
    this.filterIcons(event.target.value);
  };

  render() {
    const { icons, currentIcon, isModalOpen } = this.state;
    const { loading, error } = this.props;

    return (
      <div className="docs-content__column">
        <div className="row">
          <SearchInput
            onChange={this.handleSearchChange}
            disabled={loading || error}
            type="pill"
          />
        </div>
        <div className="row">
          <div className="icon-container docs-container">
            {error ? (
              error
            ) : (
                <React.Fragment>
                  <IconsList
                    iconsList={icons}
                    loading={loading}
                    openModal={this.openModal}
                  />
                  <IconModal
                    isOpen={isModalOpen}
                    onClose={this.closeModal}
                    currentIcon={currentIcon}
                  />
                </React.Fragment>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.iconsReducer.loading,
  error: state.iconsReducer.error,
  icons: state.iconsReducer.icons
});

IconsContainer.defaultProps = {
  icons: [],
  error: null,
  loading: false
};

IconsContainer.propTypes = {
  icons: PropTypes.array,
  fetchIcons: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.string
};

export default connect(
  mapStateToProps,
  { fetchIcons }
)(IconsContainer);
