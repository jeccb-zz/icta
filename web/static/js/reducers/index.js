import { combineReducers } from 'redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'
import user from './user'
import ideaFilter from './ideaFilter'
import userFilter from './userFilter'
import users from './users'
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import {reducer as notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
  user,
  ideaFilter,
  userFilter,
  notifications,
  users,
  i18n: i18nReducer,
});

export default rootReducer;
