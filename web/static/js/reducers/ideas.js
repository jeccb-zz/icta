import { FETCH_IDEAS_REQUEST, FETCH_IDEAS_SUCCESS, FETCH_IDEAS_FAILURE,
  ADD_IDEA_SUCCESS, VOTE_SUCCESS, DELETE_IDEA_SUCCESS } from '../actions/ideas';

const sortIdeas = (ideas) => (ideas.sort((a, b) => ( (b.up - b.down) - (a.up - a.down))));

const ideas = (state = [], action) => {
  switch(action.type) {
    case FETCH_IDEAS_REQUEST:
      return sortIdeas(state)
    case FETCH_IDEAS_SUCCESS:
      return sortIdeas([].concat(action.ideas));
    case FETCH_IDEAS_FAILURE:
      console.error("Error retrieving ideas")
      return state;
    case ADD_IDEA_SUCCESS:
      return sortIdeas([
        ...state,
        action.idea,
      ]);
    case VOTE_SUCCESS:
      const index = state.map(i => i.id).indexOf(action.idea.id);
      return sortIdeas(
        state.slice(0, index).concat([action.idea]).concat(state.slice(index+1)),
      );
    case DELETE_IDEA_SUCCESS:
      return state.filter((i) => i.id != action.ideaId);
    default:
      return state;
  }
}

export default ideas;
