import { GET_RANK, CLEAR_RANK } from '../actions/types';

const initialState = {
  rank: null,
  rankLoading: true
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RANK:
      return {
        ...state,
        rank: payload,
        rankLoading: false
      }
    default:
      return state;
  }
}