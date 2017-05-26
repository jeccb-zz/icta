import { combineReducers } from 'redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'
import user from './user'
import filter from './filter'
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';
import {reducer as notifications} from 'react-notification-system-redux';

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
  user,
  filter,
  notifications,
  i18n: i18nReducer,
});

export default rootReducer;
