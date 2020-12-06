import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { getYear, getNumberFromMonthName } from '../../utils/date';
import { getChecksByIdYearAndMonth, getCurrentUserChecksByYearAndMonth } from '../../actions/check';
import ChecksYearPicker from './ChecksYearPicker';
import ChecksMonthPicker from './ChecksMonthPicker';
import CheckTable from '../check/CheckTable';
import { connect } from 'react-redux';

const ProfileChecks = ({ checks, userId, checksByIdYearMonth, getChecksByIdYearAndMonth }) => {
  let years = [];
  const [activeYear, setActiveYear] = useState(null);
  const [activeMonth, setActiveMonth] = useState(null);
  checks.map(check => {
    if (!years.includes(getYear(check.dateTime))) {
      years.unshift(Number(getYear(check.dateTime)));
    }
    return '';
  });

  const getDatas = (month) => {
    console.log('lefutok');
    console.log(activeYear);
    console.log(month);
    getChecksByIdYearAndMonth(userId, activeYear, month);
  }

  return (
    <Fragment>
      <div className="year-picker">
        <ChecksYearPicker years={years} setActiveYear={(e) => setActiveYear(e)} activeYear={activeYear} setActiveMonth={(e) => setActiveMonth(e)} />
      </div>
      <div className="month-picker">
        <ChecksMonthPicker checks={checks.filter(check => getYear(check.dateTime) === activeYear)} activeYear={activeYear} setActiveMonth={(e) => setActiveMonth(e)} activeMonth={activeMonth} getDatas={getDatas}/>
      </div>
      {activeYear && activeMonth && (
        <div className="cehcks">
          <CheckTable checks={checksByIdYearMonth} adminBtns={true} userId={userId} />
        </div>
      )}
    </Fragment>
  )
}

ProfileChecks.propTypes = {
  checks: PropTypes.array.isRequired,
  getChecksByIdYearAndMonth: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  checksByIdYearMonth: state.check.checksByIdYearMonth
})

export default connect(mapStateToProps, { getChecksByIdYearAndMonth })(ProfileChecks);
