import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserChecksByYearAndMonth, checkIn, checkOut } from '../../actions/check';
import { getYear, getMonth, getDay, getMonthName } from '../../utils/date';
import auth from '../../reducers/auth';
import CheckTable from './CheckTable';

const Check = ({ check: { checks, checkLoading }, auth: { user, loading, isAuthenticated }, getCurrentUserChecksByYearAndMonth, checkIn, checkOut }) => {
  const date = new Date();
  useEffect(() => {
    getCurrentUserChecksByYearAndMonth(getYear(date), getMonth(date));
  }, [getCurrentUserChecksByYearAndMonth]);

  const requestDate = `${getYear(date)}-${getMonth(date)}-${getDay(date)}`;

  return !checkLoading && !loading && isAuthenticated ? (
    <section className="content">
      <h1 className="page-name text-primary text-weighter">{user && user.name}</h1>
      <p className="lead">{getYear(date)} {getMonthName(date)} - Jelenléti ív </p>
      <div className="check-buttons">
        {checks ? checks.find(check => check.date === requestDate && !check.checkOut) ?
          (<input type="button" value="Kicsekkolás" onClick={e => { e.preventDefault(); checkOut(getYear(date), getMonth(date), getDay(date)); }} className="btn btn-primary" />) : 
          checks.find(check => check.date === requestDate && check.checkOut) ?
            <div></div> : 
            (<input type="button" value="Becsekkolás" onClick={e => { e.preventDefault(); checkIn(getYear(date), getMonth(date), getDay(date)); }} className="btn btn-primary" />)
          : ''
        }
      </div>
     <CheckTable checks={checks} />
      
    </section>
  ) : '';
}

Check.propTypes = {
  getCurrentUserChecksByYearAndMonth: PropTypes.func.isRequired,
  check: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  checkIn: PropTypes.func.isRequired,
  checkOut: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  check: state.check,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentUserChecksByYearAndMonth, checkIn, checkOut })(Check);
