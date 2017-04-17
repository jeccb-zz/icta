import { USER_INFO_SUCCESS, USER_INFO_FAILURE, USER_INFO_REQUEST } from '../actions/ideas';

const user = (state = { name: null, id: null }, action) => {
  switch(action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };
    case USER_INFO_SUCCESS:
      return { ...action.user};
    case USER_INFO_FAILURE:
      return { ...state, loading: false, error: action.error }
    default:
      return state;
  }
}

export default user;
