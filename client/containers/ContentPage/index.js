import React from 'react';
import PropTypes from 'prop-types';
import comingSoon from '../../assets/coming-soon.jpg';
import config from '../../config';
import PageHeader from '../../collab-ui/PageHeader';
import { Spinner } from '@collab-ui/react';
import DesignTab from '../../components/DesignTab';

class DefaultPage extends React.Component {
  state = {
    loading: true,
    content: null,
    description: null,
    displayName: null,
    style: null,
    usage: null,
  };

  componentDidMount() {
    return fetch(`${config.PAGES_URL}/${this.props.page.object_id}`)
    .then(res => res.json())
    .then(response => {
      const page = response;
      const {
        content,
        description,
        displayName,
        style,
        usage,
      } = page;
      const loading = false;
      this.setState({
        content,
        loading,
        description,
        displayName,
        style,
        usage,
      });
    });
  }


  render() {
    const {
      content,
      loading,
      description,
      displayName,
      style,
      usage,
    } = this.state;

    const getContent = () => {
      /* eslint-disable react/no-danger */
      if (style || usage) {
        return (
          <div className="docs-content-area docs-content-area--with-pagenav">
            <DesignTab {...this.props} sections={style || usage} />
          </div>
          );
      } else if (content) {
        return (
          <div className="docs-content__column row">
            <div className="medium-11 columns medium-offset-1" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      } else return <img src={comingSoon} alt="Coming Soon" />;
      /* eslint-enable react/no-danger */
    };

    return (
      <React.Fragment>
        { displayName && <PageHeader title={displayName} lead={description} textAlign="left" /> }
        <div className="docs-content-area">
        {loading
          ? <Spinner />
          : getContent()}
        </div>
      </React.Fragment>
    );
  }
}

DefaultPage.propTypes = {
  page: PropTypes.object.isRequired,
};

export default DefaultPage;
