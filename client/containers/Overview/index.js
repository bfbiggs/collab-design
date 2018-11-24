import React from 'react';
import PropTypes from 'prop-types';
import PageHeader from '../../collab-ui/PageHeader';
import OverviewPage from './OverviewPage';
import { fetchPageData } from './actions';
import { connect } from 'react-redux';

class OverviewContainer extends React.Component {
  componentDidMount() {
    this.props.fetchPageData(this.props.id);
  }

  render() {
    const {
      id,
      pageData,
      ...props
    } = this.props;

    return (
      pageData 
        && pageData[id]
        && <OverviewPage data={pageData[id]} {...props} />
        || <PageHeader textAlign="left" />
    );
  }
}

const mapStateToProps = state => ({
  pageData: state.pageReducer.pages
});

OverviewContainer.propTypes = {
  child: PropTypes.shape({}).isRequired,
  fetchPageData: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  pageData: PropTypes.shape({}),
};

OverviewContainer.defaultProps = {
  pageData: {}
};

export default connect(mapStateToProps, { fetchPageData })(OverviewContainer);
