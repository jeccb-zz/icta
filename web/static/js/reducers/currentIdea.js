import { SHOW_IDEA_SUCCESS } from '../actions/ideas';

const currentIdea = (state = null, action) =>{
  switch(action.type) {
    case SHOW_IDEA_SUCCESS:
      return { ...action.idea };
    default:
      return state
  }
}

export default currentIdea;
