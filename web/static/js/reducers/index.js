import { combineReducers } from 'redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
});

export default rootReducer;
