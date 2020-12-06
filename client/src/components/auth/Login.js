import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setformData({
    ...formData, [e.target.name]: e.target.value
  });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  // Átirányítás ha be vagy jelentkezve
  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <section className="content">
      <h1 className="page-name text-large text-primary text-weighter">Belépés</h1>
      <p className="lead">
        <i className="fas fa-user"></i>{' '} Jelentkezz be a fiókodba
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" placeholder="Email cím" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Jelszó" name="password" value={password} onChange={e => onChange(e)} required />
        </div>
        <input type="submit" className="btn btn-primary" value="Belépés" />
      </form>
    </section>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
