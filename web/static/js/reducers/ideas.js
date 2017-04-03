import { FETCH_IDEAS_REQUEST, FETCH_IDEAS_SUCCESS, FETCH_IDEAS_FAILURE, ADD_IDEA_SUCCESS } from '../actions/ideas';

const ideas = (state = [], action) => {
  switch(action.type) {
    case FETCH_IDEAS_REQUEST:
      return state
    case FETCH_IDEAS_SUCCESS:
      return [].concat(action.ideas);
    case FETCH_IDEAS_FAILURE:
      console.error("Error retrieving ideas")
      return state;
    case ADD_IDEA_SUCCESS:
      return [
        ...state,
        action.idea,
      ];
    default:
      return state;
  }
}

export default ideas;
