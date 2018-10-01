import React from 'react';
import PropTypes from 'prop-types';

class ParentPage extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div><h1>{title}</h1></div>
    );
  }



}

ParentPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ParentPage;
