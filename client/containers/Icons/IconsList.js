import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from '@collab-ui/react';
import map from 'lodash/map';
import reduce from 'lodash/reduce';

export default class IconsList extends React.Component {
  getClosest = (array, target) => {
    const sizeArray = map(array, val => [val, Math.abs(val - target)]);
    return reduce(
      sizeArray,
      (memo, val) => {
        return memo[1] < val[1] ? memo : val;
      },
      [-1, 999]
    )[0];
  };

  render() {
    const { iconsList, loading, openModal } = this.props;

    return (
      <div className="icon-list">
        {loading
          ? [...Array(20)].map((ele, idx) => {
              return (
                <div key={`${loading}-${idx}`} className="icon-example">
                  <div className="icon-example__icon">
                    <Spinner size={20} />
                  </div>
                  <div className="icon-example__name">{'...Loading'}</div>
                </div>
              );
            })
          : iconsList.map((icon, index) => {
              const modifiedIcon = {
                ...icon,
                defaultSize: this.getClosest(icon.colors.default, 36),
              };

              return (
                <div className="icon-example" onClick={() => openModal(modifiedIcon)} key={index}>
                  <div className={`icon-example__icon icon-${icon.name}_${modifiedIcon.defaultSize} icon-${icon.name}`} />
                  <div className="icon-example__name">{icon.name}</div>
                </div>
              );
            })}
      </div>
    );
  }
}

IconsList.propTypes = {
  iconsList: PropTypes.array,
  loading: PropTypes.bool,
  openModal: PropTypes.func.isRequired,
};

IconsList.defaultProps = {
  iconsList: [],
  loading: false,
};
