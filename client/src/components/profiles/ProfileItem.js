import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const ProfileItem = ({
  profile: { 
    address: {
      street,
      zipCode,
      county
    },
    user: {
      _id,
      name
    },
    title: {
      rank
    },
    position,
    socialSecurityNumber,
    taxNumber
  }
}) => {
  return (
    <Link to={`profile/${_id}`}>
      <div className="profile">
        <div className="profile-name bg-primary text-light">
          <h2 className="text-medium">{name}</h2>
          <p className='rank text-small'>- {position}, {rank.name}</p>
        </div>
        <div className="profile-about bg-dark text-light">
          <div className="about-item">
            <div className="about-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="about-content">
              {`${zipCode}, ${county} - ${street.name} ${street.number}`}
            </div>
          </div>
          <div className="about-item">
            <div className="about-icon">
            <i className="fas fa-file-medical-alt"></i>
            </div>
            <div className="about-content">
              {socialSecurityNumber}
            </div>
          </div>
          <div className="about-item">
            <div className="about-icon">
              <i className="fas fa-money-check-alt"></i>
            </div>
            <div className="about-content">
              {taxNumber}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

ProfileItem.propTypes = {

}


export default connect(null, null)(ProfileItem);
