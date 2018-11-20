import React from 'react';
import PropTypes from 'prop-types';
import comingSoon from '../../assets/coming-soon.jpg';
import config from '../../config';
import get from 'lodash/get';
import PageHeader from '../../collab-ui/PageHeader';
import { Spinner } from '@collab-ui/react';

class DefaultPage extends React.Component {
  state = {
    loading: true,
    content: null,
    mainImage: null,
    description: null,
    displayName: null,
  };

  componentDidMount() {
    return fetch(`${config.PAGES_URL}/${this.props.page.object_id}`)
    .then(res => res.json())
    .then(response => {
      const page = response;
      const { mainImage, description, displayName, content } = page;
      const loading = false;
      this.setState({
        content, loading, mainImage, description, displayName,
      });
    });
  }

  render() {
    const {
      lead,
      title,
    } = this.props;
    const {
      content,
      loading,
      description,
      displayName
    } = this.state;

    return (
      <React.Fragment>
        {!displayName
          ? <PageHeader title={title} lead={lead} textAlign="left" />
          : <PageHeader title={displayName} lead={description} textAlign="left" />
        }
        <div className="docs-content-area">
        {loading /* eslint-disable react/no-danger */
          ? <Spinner />
          : content
              ? <div className="docs-content__column row"><div className="medium-11 columns medium-offset-1" dangerouslySetInnerHTML={{ __html: content }} /></div>
              : <img src={comingSoon} alt="Coming Soon" />
          /* eslint-enable react/no-danger */}
        </div>
      </React.Fragment>
    );
  }
}

DefaultPage.propTypes = {
  lead: PropTypes.string,
  page: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

DefaultPage.defaultProps = {
  lead: null,
};

export default DefaultPage;
