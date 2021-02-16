import {
  GET_PROFILES, GET_CURRENT_PROFILE, PROFILE_ERROR, GET_PROFILE_BY_ID, PROFILE_LOGOUT,
  ADD_HOLIDAY_FROM_ADMIN, DELETE_HOLIDAY, MODIFY_HOLIDAY_STATUS, TOGGLE_ADD_PROFILE_CLOSING
} from '../actions/types';

const initialState = {
  profile: null,
  profileById: null,
  profiles: [],
  profileLoading: true,
  addProfileClosing: false,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_PROFILE:
      return {
        ...state,
        profile: payload,
        profileLoading: false
      }
    case GET_PROFILE_BY_ID:
    case ADD_HOLIDAY_FROM_ADMIN:
    case DELETE_HOLIDAY:
    case MODIFY_HOLIDAY_STATUS:
      return {
        ...state,
        profileById: payload,
        profileLoading:false
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        profileLoading: false
      }
    case PROFILE_ERROR:
    case PROFILE_LOGOUT:
      return {
        ...state,
        profile: null,
        profileLoading: false,
        error: payload
      }
    case TOGGLE_ADD_PROFILE_CLOSING:
      return {
        ...state,
        addProfileClosing: !state.addProfileClosing
      }
    default:
      return state
  }
}