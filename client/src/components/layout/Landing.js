import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='dashboard' />
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner text-lighter'>
          <h1 className='text-huge'>CoWorker</h1>
          <p className="lead text-medium">Tartsa nyilván alkalmazottai munkaidjét</p>
          <div className="buttons">
            <div className="btn btn-primary">
              <Link to='/login'>Belépés</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.protoTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
