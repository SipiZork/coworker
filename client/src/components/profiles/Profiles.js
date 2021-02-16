import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles, toggleAddProfileClosing } from '../../actions/profile';
import ProfileItem from './ProfileItem';
import AddProfile from './AddProfile';

const Profiles = ({ profile: { profile, profiles }, getProfiles, toggleAddProfileClosing }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [searchField, setsearchField] = useState({
    search: ''
  });

  const { search } = searchField;

  const [hidden, setHidden] = useState(true);
  const [clickable, setClickable] = useState(true);

  const toggleHidden = () => {
    if (clickable) {
      if (!hidden) {
        setClickable(current => !current);
        toggleAddProfileClosing();
        setTimeout(() => {
          toggleAddProfileClosing();
          setClickable(current => !current);
          setHidden(current => !current);
        }, 500);
      } else {
        setHidden(current => !current);
        setClickable(current => !current);
        setTimeout(() => {
          setClickable(current => !current);
        }, 500);
      }
    }
  }

  const onChangeSearchField = e => setsearchField({
    ...searchField, [e.target.name]: e.target.value
  })

  return (
    <section className="content">
      <div className="page-name-container">
        <h1 className="page-name text-primary text-weighter">Dolgozók</h1>
        <div className="search-field-container">
          <i className="fas fa-search"></i>{' '}<input type="search" name="search" className='search-field' placeholder='Keresés név alapján' value={search} onChange={e => onChangeSearchField(e)} autoComplete='off' />
        </div>
      </div>
      <div className="profiles">
        <div className="add-user" onClick={toggleHidden}>
          <i className="fas fa-plus"></i>{' '} Dolgozó hozzáadása
        </div>
        {!hidden && <AddProfile classes={hidden && 'closing'} />}
        {search ? profiles.filter(profile => profile.user.name.toUpperCase().includes(search.toUpperCase())).map(filteredProfile => {
          
          // let requestHolidays = 
          console.log()
          return (
            <ProfileItem key={filteredProfile._id} profile={filteredProfile} />
          );
        }) : 
          profiles.map(profile => {
            return (
              <ProfileItem key={profile._id} profile={profile} />
            );
          })
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

export default connect(mapStateToProps, { getProfiles, toggleAddProfileClosing })(Profiles);
