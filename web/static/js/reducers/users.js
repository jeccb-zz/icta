import { ALL_USERS_RECEIVED } from '../actions/ideas';
import { USER_UPDATE_FAILURE, USER_UPDATE_RECEIVED } from '../actions/users';

const replaceUser = (users, newUser, index) => (users.slice(0, index).concat([newUser]).concat(users.slice(index + 1)));

const allUsers = ( state = 'loading', action ) => {
  switch(action.type) {
    case ALL_USERS_RECEIVED:
      return action.users;
    case USER_UPDATE_RECEIVED:
      const updatedIndex = state.map(i => i.id).indexOf(action.user.id);

      return replaceUser(state, action.user, updatedIndex)
    case USER_UPDATE_FAILURE:
      const editedIndex = state.map(i => i.id).indexOf(action.id);
      const editedUser = {
        ...state[editedIndex],
        kind: action.kind,
      };

      return replaceUser(state, editedUser, editedIndex)
    default:
      return state;
  }
}

export default allUsers;
