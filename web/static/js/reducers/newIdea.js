import { ADD_IDEA_SUCCESS, ADD_IDEA_FAILURE, ADD_IDEA_REQUEST } from '../actions/ideas';

const initialState = {
  loading: false,
  error: null,
};

const newIdea = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IDEA_REQUEST:
      return { ...state, loading: true };
    case ADD_IDEA_SUCCESS:
      return { ...initialState };
    case ADD_IDEA_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default newIdea;
