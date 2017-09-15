import { CHANGE_FILTER_TEXT } from '../actions/users';

const userFilter = (state = { text: '' }, action) => {
  switch (action.type) {
    case CHANGE_FILTER_TEXT:
      return { ...state, text: action.filter };
    default:
      return state;
  }
};

export default userFilter;
