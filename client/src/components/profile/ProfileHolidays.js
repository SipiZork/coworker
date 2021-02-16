import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ChecksYearPicker from './ChecksYearPicker';
import HolidayTable from '../holiday/HolidayTable';

const ProfileHolidays = ({ holidays, userId }) => {
  let years = [];
  const [activeYear, setActiveYear] = useState(false);
  holidays.map(holiday => {
    if (!years.includes(holiday.year)) {
      years.unshift(holiday.year);
    }
  });

  return (
    <Fragment>
      <div className="year-picker">
        <ChecksYearPicker years={years} setActiveYear={(e) => setActiveYear(e)} activeYear={activeYear} />
      </div>
      <div className="checks">
        {
          <HolidayTable holidays={holidays.filter(holiday => holiday.year === activeYear)} adminBtns={true} userId={userId} />
        }
      </div>
    </Fragment>
  )
}

ProfileHolidays.propTypes = {

}

const mapStateToProps = state => ({
  
})

export default connect(null,null)(ProfileHolidays);
