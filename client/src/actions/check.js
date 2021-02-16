import axios from 'axios';

import {
  GET_CURRENT_USER_CHECKS, GET_CHECK_ERROR, CHECK_IN, CHECK_OUT,
  GET_CHECKS_BY_ID, GET_CHECKS_BY_ID_YEAR_MONTH,
  UPDATE_CHECK, CREATE_CHECK_FROM_ADMIN, DELETE_CHECK_FROM_ADMIN
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

export const updateTime = (userId, id, year, month, day, checkIn, checkOut) => async dispatch =>{
  try {
    let timeIn = checkIn !== 'false' ? new Date(`${year}-${month}-${day} ${checkIn}`).getTime() : 0;
    let timeOut = checkOut !== 'false' ? new Date(`${year}-${month}-${day} ${checkOut}`).getTime() : 0;
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const body = JSON.stringify({ year, month, day, timeIn, timeOut });
    const res = await axios.put(`/api/check/modify/${userId}/${id}`, body, config);

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
};

export const createCheckFromAdmin = (userId, year, month, day, checkInTime, checkOutTime) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const body = JSON.stringify({ year, month, day, checkInTime, checkOutTime });
    const res = await axios.post(`/api/check/create/${userId}/`, body, config);
    dispatch({
      type: CREATE_CHECK_FROM_ADMIN,
      payload: res.data
    })
 } catch (error) {
  dispatch({
    type: GET_CHECK_ERROR,
    payload: { msg: 'problem' }
  });
 }
};

export const deleteCheckFromAdmin = (userId, checkId, year, month) => async dispatch => { 
  try {
    const res = await axios.delete(`/api/check/delete/${userId}/${checkId}/${year}/${month}`);
    dispatch({
      type: DELETE_CHECK_FROM_ADMIN,
      payload: res.data
    })
  } catch (error) {
    dispatch({
      type: GET_CHECK_ERROR,
      payload: { msg: 'problem' }
    });
  }
}