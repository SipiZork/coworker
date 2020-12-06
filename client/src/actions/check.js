import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CURRENT_USER_CHECKS, GET_CHECK_ERROR, CHECK_IN, CHECK_OUT,
  CHECK_LOADING_FALSE, GET_CHECKS_BY_ID, GET_CHECKS_BY_ID_YEAR_MONTH,
  UPDATE_CHECK
} from './types';

// Get Current User datas
export const getCurrentUserChecks = () => async dispatch => {
  try {
    const res = await axios.get('/api/check/me');

    dispatch({
      type: GET_CURRENT_USER_CHECKS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get Current User datas by Month
export const getCurrentUserChecksByYearAndMonth = (year, month) => async dispatch => {
  try {
    const res = await axios.get(`/api/check/me/${year}/${month}`);
    dispatch({
      type: GET_CURRENT_USER_CHECKS,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: 'problem' }
    });
  }
};

// Check in 
export const checkIn = (year, month, day) => async dispatch => {
  try {
    const res = await axios.put(`/api/check/in/${year}/${month}/${day}`);
    dispatch({
      type: CHECK_IN,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
};

export const checkOut = (year, month, day) => async dispatch => {
  try {
    const res = await axios.put(`/api/check/out/${year}/${month}/${day}`);
    dispatch({
      type: CHECK_OUT,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
};

export const getChecksById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/check/${id}`);
    dispatch({
      type: GET_CHECKS_BY_ID,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    })
  }
};

export const getChecksByIdYearAndMonth = (userId, year, month) => async dispatch => {
  try {
    const res = await axios.get(`/api/check/${userId}/${year}/${month}`);
    dispatch({
      type: GET_CHECKS_BY_ID_YEAR_MONTH,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: 'problem' }
    });
  }
};

export const updateTime = (userId, id, year, month, day, direction, time) => async dispatch =>{
  try {
    let timeIn = new Date(`${year}-${month}-${day} ${time}`).getTime();
    console.log(timeIn);
    const res = await axios.put(`/api/check/${userId}/${id}/${year}/${month}/${day}/${direction}/${timeIn}`);
    console.log('megvan az action');
    dispatch({
      type: UPDATE_CHECK,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: 'problem' }
    });
  }
}