import { combineReducers } from 'redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'
import user from './user'

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
  user,
});

export default rootReducer;
