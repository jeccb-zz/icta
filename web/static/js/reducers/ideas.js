import { SHOW_IDEAS_REQUEST, SHOW_IDEAS_SUCCESS, SHOW_IDEAS_FAILURE,
  ADD_IDEA_SUCCESS, VOTE_SUCCESS, DELETE_IDEA_SUCCESS, NEW_IDEA_RECEIVED,
  CHANGE_MY_VOTE, EDIT_IDEA_RECEIVED } from '../actions/ideas';

const sortIdeas = (ideas) => (ideas.sort((a, b) => ( (b.up - b.down) - (a.up - a.down))));

const replaceIdea = (ideas, newIdea, index) => (ideas.slice(0, index).concat([newIdea]).concat(ideas.slice(index+1)));

const ideas = (state = [], action) => {
  switch(action.type) {
    case SHOW_IDEAS_REQUEST:
      return sortIdeas(state)
    case SHOW_IDEAS_SUCCESS:
      return sortIdeas([].concat(action.ideas));
    case SHOW_IDEAS_FAILURE:
      console.error("Error retrieving ideas")
      return state;
    case NEW_IDEA_RECEIVED:
      return sortIdeas([
        ...state,
        action.idea,
      ]);
    case EDIT_IDEA_RECEIVED:
      const editedIndex = state.map(i => i.id).indexOf(action.idea.id);
      const editedIdea = {
        ...state[editedIndex],
        title: action.idea.title,
        body: action.idea.body,
        status: action.idea.status,
        owner: action.idea.owner
      };

      return sortIdeas(
        replaceIdea(state, editedIdea, editedIndex)
      );

    case CHANGE_MY_VOTE:
      const idx = state.map(i => i.id).indexOf(action.ideaId);
      const dupIdea = { ...state[idx], my_vote: action.myVote }

      return replaceIdea(state, dupIdea, idx)
    case VOTE_SUCCESS:
      const index = state.map(i => i.id).indexOf(action.idea.id);
      const newIdea = { ...state[index], up: action.idea.up, down: action.idea.down }

      return sortIdeas(
        replaceIdea(state, newIdea, index)
      );
    case DELETE_IDEA_SUCCESS:
      return state.filter((i) => i.id != action.ideaId);
    default:
      return state;
  }
}

export default ideas;
