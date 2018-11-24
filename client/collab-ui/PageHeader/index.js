import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = props => {
  const { title, lead, textAlign } = props;

  return (
    <div className={'cui-page-header ' + (textAlign === 'left' ? 'cui-page-header--left' : '')}>
      <div className="cui-page-header__container ">
        <div className="cui-page-header__title">{title}</div>
        {/* eslint-disable react/no-danger */}
        <h4 className="cui-page-header__lead" dangerouslySetInnerHTML={{ __html: lead }} />
        {/* eslint-enable react/no-danger */}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  textAlign: PropTypes.string,
};

PageHeader.defaultProps = {
  lead: null,
  textAlign: 'center',
  title: null,
};

export default PageHeader;
