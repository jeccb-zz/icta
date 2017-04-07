import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
  routing: routerReducer
});

export default rootReducer;
