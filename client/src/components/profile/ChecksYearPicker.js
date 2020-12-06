import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ChecksYearPicker = ({ years, activeYear, setActiveYear, setActiveMonth }) => {

  const handleClick = (e, year) => {
    e.preventDefault();
    setActiveYear(year);
    setActiveMonth(false);
  }
  return (
    <Fragment>
      {years && years.map(year => (
        <input type="button" name='year' key={year} className={`btn ${activeYear === year ? 'btn-primary' : 'btn-dark'}`} value={year} onClick={(e) => handleClick(e, year)} />
      ))}
    </Fragment>
  )
}

export default ChecksYearPicker;
