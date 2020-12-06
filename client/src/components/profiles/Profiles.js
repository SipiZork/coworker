import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profile, profiles }, getProfiles }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles, getCurrentProfile]);

  const [searchField, setsearchField] = useState({
    search: ''
  });

  const { search } = searchField;

  const onChange = e => setsearchField({
    ...searchField, [e.target.name]: e.target.value
  })

  return (
    <section className="content">
      <div className="page-name-container">
        <h1 className="page-name text-primary text-weighter">Dolgozók</h1>
        <div className="search-field-container">
          <i className="fas fa-search"></i>{' '}<input type="search" name="search" className='search-field' placeholder='Keresés név alapján' value={search} onChange={e => onChange(e)} autoComplete='off' />
        </div>
      </div>
      <div className="profiles">
        {search ? profiles.filter(profile => profile.user.name.toUpperCase().includes(search.toUpperCase())).map(filteredProfile => {
          console.log(filteredProfile);
          return (
            <ProfileItem key={filteredProfile._id} profile={filteredProfile} />
          );
        }) : 
        profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      }
      </div>
    </section>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getProfiles })(Profiles);
