import React from 'react';
import PropTypes from 'prop-types';
import { getYear } from '../../utils/date';
import { connect } from 'react-redux';
import HolidayTable from './HolidayTable';

const Holidays = ({ profile }) => {
  const date = new Date();
  console.log(profile);
  return profile && (
    <section className="content">
      <h1 className="page-name text-primary text-weighter">{profile.user && profile.user.name}</h1>
      <p className="lead">{getYear(date)} - Szabadságok </p>
      <HolidayTable holidays = {profile.holidays.filter(holiday => holiday.year === getYear(date))} />
    </section>
  )
}

Holidays.propTypes = {
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  auth: state.auth
})

export default connect(mapStateToProps)(Holidays);
