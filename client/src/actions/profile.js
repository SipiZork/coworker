import axios from 'axios';

import { GET_PROFILE, GET_PROFILES, GET_CURRENT_PROFILE, PROFILE_ERROR, GET_PROFILE_BY_ID } from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

export const getProfiles = () => async dispatch => {
  const res = await axios.get('/api/profile');
  try {
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}

export const getProfileByID = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {msg: error.response.statusText, status: error.response.status}
    })
  }
}
