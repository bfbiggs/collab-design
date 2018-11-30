import React from 'react';
import PropTypes from 'prop-types';

export default class IconProperties extends React.Component {
  render() {
    const { values, selectedValue, onSelect } = this.props;

    return values.reduce((agg, size, idx) => {
      const addComma = idx !== values.length - 1 && <span key={`size-${idx}-0`}>, </span>;
      return size == selectedValue
        ? agg.concat([<span key={`size-${idx}`}>{size}</span>, addComma])
        : agg.concat([
            <button className="cui-button--none cui-link cui-link--blue" tabIndex={0} onClick={() => onSelect(size)} key={`size-${idx}-1`}>
              {size}
            </button>,
            addComma,
          ]);
    }, []);
  }
}

IconProperties.propTypes = {
  values: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
