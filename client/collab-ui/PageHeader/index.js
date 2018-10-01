import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { title, lead, textAlign } = props;

  return (
    <div className={
      'cui-page-header ' +
      (textAlign === 'left' ? 'cui-page-header--left' : '')
    }>
      <div className="cui-page-header__container ">
        <div className="cui-page-header__title">{title}</div>
        <h4 className="cui-page-header__lead">{lead}</h4>
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  /* @prop */
  title: PropTypes.string.isRequired,
  /* @prop */
  lead: PropTypes.string,
};

PageHeader.defaultProps = {
  lead: null,
};

export default PageHeader;
