import axios from 'axios';

import {
  REGISTER_USER, REGISTER_ERROR
} from './types';

export const registerUser = (name, email, password) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application=json'
      }
    }

    const body = JSON.stringify({ name, email, password });
    const res = await axios.post(`/api/users/`, body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: REGISTER_ERROR,
      payload: { msg: 'Hiba a regisztráció alatt' }
    })
  }
}