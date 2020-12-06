import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({
  auth: {
    isAuthenticated,
    loading
  }, profile: {
    profile,
    profileLoading
  },
  logout
}) => {
  const adminLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className="fas fa-user-tie"></i>{' '}
          <span className="hide-sm">Profilok</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-business-time"></i>{' '}
          <span className="hide-sm">Aktuális jelenléti ív</span>
          </Link>
      </li>
      <li>
        <Link to='/holidays'>
          <i className="fas fa-candy-cane"></i>{' '}
          <span className="hide-sm">Saját Szabadságok</span>
          </Link>
      </li>
      
      <li>
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Kilépés</span>
          </a>
      </li>
    </ul>
  )
  const authLinks = (
    <ul>
      <li>
        <Link to='/holidays'>
          <i className="fas fa-business-time"></i>{' '}
          <span className="hide-sm">Aktuális jelenléti ív</span>
          </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className="fas fa-candy-cane"></i>{' '}
          <span className="hide-sm">Saját Szabadságok</span>
          </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Kilépés</span>
          </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/login'>Belépés</Link>
      </li>
    </ul>
  )
  return (
    <nav className='navbar bg-dark text-light'>
      <h1 className='text-large'>
        <Link to='/'>
          <i className='fas fa-users'></i>{' '}CoWorker
        </Link>
      </h1>
      { loading || profileLoading ? <Fragment>loading</Fragment> : profile === null ? guestLinks : profile.title.rank.permissionNumber >= 2 ? <Fragment>{adminLinks}</Fragment> : <Fragment>{authLinks}</Fragment> }
  </nav>
  )
}

/*
<ul>
  <li>Dolgozók</li>
  <li>Jelenléti ívek</li>
  <li>
    <i className='fas fa-user'></i>{' '}Niki Gyöngyösi
  </li>
</ul>
*/

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logout })(Navbar);
