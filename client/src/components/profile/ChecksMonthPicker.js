import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMonthName, getNumberFromMonthName } from '../../utils/date';

const ChecksMonthPicker = ({ checks, activeMonth, setActiveMonth, getDatas }) => {
  let months = [];
  const handleClick = (e, month) => {
    e.preventDefault();
    setActiveMonth(month);
    getDatas(getNumberFromMonthName(month));
  }
  checks.map(check => {
    if (!months.includes(getMonthName(check.dateTime))) {
      months.unshift(getMonthName(check.dateTime));
    }
  });
  return (
    <Fragment>
      {months && months.map(month => (
        <input type="button" name='month' key={month} className={`btn ${activeMonth === month ? 'btn-primary' : 'btn-dark'}`} value={month} onClick={(e) => handleClick(e, month)} />
      ))}
    </Fragment>
  )
}

export default ChecksMonthPicker;
