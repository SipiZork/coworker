import { GET_PROFILE, GET_PROFILES, GET_CURRENT_PROFILE, PROFILE_ERROR, GET_PROFILE_BY_ID } from '../actions/types';

const initialState = {
  profile: null,
  profileById: null,
  profiles: [],
  profileLoading: true,
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
      return {
        ...state,
        profile: null,
        profileLoading: false,
        error: payload
      }
    default:
      return state
  }
}