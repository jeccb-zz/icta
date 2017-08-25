import { ALL_USERS_RECEIVED } from '../actions/ideas';

const allUsers = ( state = 'loading', action ) => {
  switch(action.type) {
    case ALL_USERS_RECEIVED:
      return action.users;
    default:
      return state;
  }
}

export default allUsers;
