import { FETCH_IDEA_REQUEST, FETCH_IDEA_SUCCESS } from '../actions/ideas';

const currentIdea = (state = null, action) => {
  switch (action.type) {
    case FETCH_IDEA_REQUEST:
      return { loading: true };
    case FETCH_IDEA_SUCCESS:
      return { loading: false, ...action.idea };
    default:
      return state;
  }
};

export default currentIdea;
