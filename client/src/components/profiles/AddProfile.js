import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user';
import { setAlert } from '../../actions/alert';

const AddProfile = ({ registerUser, setAlert, profile }) => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  const { name, email, password, passwordAgain } = formData;
  
  const onChangeFormData = e => setFormData({
    ...formData, [e.target.name]: e.target.value
  });

  const submit = (e) => {
    e.preventDefault();
    if (password !== '' && passwordAgain !== '' && password === passwordAgain) {
      registerUser()
    } else {
      setAlert('A két jelszó nem egyezik meg', 'danger', 2500);
    }
  }

  return (
    <div className={`add-user-container${profile.addProfileClosing ? ' closing': ''}`}>
      <form className="add-user-form" onSubmit={e => submit(e)}>
        <div className="data">
          <input type="text" name="name" className="name" value={name} onChange={e => onChangeFormData(e)}required /><label htmlFor="name" required>Dolgozó neve</label>
        </div>
        <div className="data">
          <input type="email" name="email" className="email" value={email} onChange={e => onChangeFormData(e)}required /><label htmlFor="email">Dolgozó email címe</label>
        </div>
        <div className="data">
          <input type="password" name="password" className="password" value={password} onChange={e => onChangeFormData(e)}required /><label htmlFor="email">Jelszó</label>
        </div>
        <div className="data">
          <input type="password" name="passwordAgain" className="password" value={passwordAgain} onChange={e => onChangeFormData(e)}required /><label htmlFor="email">Jelszó ismét</label>
        </div>
        <div className="data">
          <button type="submit" className="btn btn-primary">Dolgozó hozzáadása</button>
        </div>
      </form>
    </div>
  )
}

AddProfile.propTypes = {
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { registerUser, setAlert })(AddProfile);
