import { USER_INFO_SUCCESS, USER_INFO_FAILURE, USER_INFO_REQUEST,
  USER_UPDATE_RECEIVED } from '../actions/users';

const user = (state = { name: null, id: null, image_url: null, kind: null }, action) => {
  switch(action.type) {
    case USER_INFO_REQUEST:
      return { ...state, loading: true };
    case USER_INFO_SUCCESS:
      return { ...action.user};
    case USER_INFO_FAILURE:
      return { ...state, loading: false, error: action.error }
    case USER_UPDATE_RECEIVED:
      if (action.user.id === state.id) {
        return {...state, kind: action.user.kind}
      } else {
        return state;
      }

    default:
      return state;
  }
}

export default user;
