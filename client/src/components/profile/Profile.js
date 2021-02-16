import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChecksById } from '../../actions/check';
import { getProfileByID } from '../../actions/profile';
import ProfileButtons from './PropfileButtons';
import ProfileChecks from './ProfileChecks';
import ProfileHolidays from './ProfileHolidays';


const Profile = ({ check: { checksById }, profileById, getChecksById, getProfileByID, match }) => {
  useEffect(() => {
    getChecksById(match.params.id);
    getProfileByID(match.params.id);
  }, [getChecksById, getProfileByID, match.params.id])
  const [activeButton, setActiveButton] = useState('checks');
  return profileById === null ? <Fragment>loading...</Fragment> : (
    <section className="content">
      <h1 className="page-name text-primary text-large text-weighter">{profileById.user.name} profilja</h1>
      <div className="profile-btn-container">
        <ProfileButtons setActiveButton={(e) => setActiveButton(e)} activeButton={activeButton} />
      </div>
      <div className="profile-content">
        {activeButton === 'checks' && <ProfileChecks checks={checksById} userId={match.params.id} />}
        {activeButton === 'holidays' && <ProfileHolidays holidays={profileById.holidays} userId={match.params.id} />}
      </div>
    </section>
  )
}

Profile.propTypes = {
  getChecksById: PropTypes.func.isRequired,
  getProfileByID: PropTypes.func.isRequired,
  check: PropTypes.object.isRequired,
  profileById: PropTypes.object
}

const mapStateToProps = state => ({
  check: state.check,
  profileById: state.profile.profileById
})

export default connect(mapStateToProps, { getChecksById, getProfileByID })(Profile);
