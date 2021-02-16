import axios from 'axios';

import {
  GET_PROFILES, GET_CURRENT_PROFILE, PROFILE_ERROR, GET_PROFILE_BY_ID, ADD_HOLIDAY_FROM_ADMIN,
  DELETE_HOLIDAY, MODIFY_HOLIDAY_STATUS, TOGGLE_ADD_PROFILE_CLOSING
} from './types';

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
};

export const addHolidayFromAdmin = (userId, from, to, type) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ from, to, type });
    const res = await axios.post(`/api/holiday/request/${userId}`, body, config);
  
    dispatch({
      type: ADD_HOLIDAY_FROM_ADMIN,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const deleteHoliday = (userId, holidayId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/holiday/delete/${userId}/${holidayId}`);
    dispatch({
      type: DELETE_HOLIDAY,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const modifyHolidayStatus = (userId, holidayId, value = null) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (value !== null) {
      var body = JSON.stringify({ value });
    } else {
      var body = JSON.stringify({});
    }
    const res = await axios.patch(`/api/holiday/modify/status/${userId}/${holidayId}`, body, config);
    dispatch({
      type: MODIFY_HOLIDAY_STATUS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

export const toggleAddProfileClosing = () => async dispatch => {
  dispatch({
    type: TOGGLE_ADD_PROFILE_CLOSING
  })
}