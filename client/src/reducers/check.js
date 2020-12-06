import {
  GET_CURRENT_USER_CHECKS, GET_CHECK_ERROR,
  CHECK_IN, CHECK_OUT, CHECK_LOADING_FALSE, GET_CHECKS_BY_ID, GET_CHECKS_BY_ID_YEAR_MONTH,
  UPDATE_CHECK
} from '../actions/types';


const initialState = {
  checks: [],
  checksById: [],
  checksByIdYearMonth: [],
  checksByIdYearMonthLoading: true,
  checkLoading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_USER_CHECKS:
    case CHECK_IN:
    case CHECK_OUT:
      return {
        ...state,
        checks: payload,
        checkLoading: false
      }
    case GET_CHECKS_BY_ID: 
      return {
        ...state,
        checksById: payload,
        checkLoading: false
      }
    case GET_CHECKS_BY_ID_YEAR_MONTH:
    case UPDATE_CHECK:
      return {
        ...state,
        checksByIdYearMonth: payload,
        checkLoading: false,
        checksByIdYearMonthLoading: false
      }
    case CHECK_LOADING_FALSE: 
      return {
        ...state,
        checkLoading: true
      }
    case GET_CHECK_ERROR:
      return {
        ...state,
        checks: [],
        checkLoading: false,
        error: payload
      }
    default:
      return state
  }
}