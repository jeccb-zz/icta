import { combineReducers } from 'redux';
import ideas from './ideas'
import newIdea from './newIdea'
import currentIdea from './currentIdea'
import user from './user'
import { loadTranslations, setLocale, syncTranslationWithStore, i18nReducer } from 'react-redux-i18n';

const rootReducer = combineReducers({
  ideas,
  newIdea,
  currentIdea,
  user,
  i18n: i18nReducer
});

export default rootReducer;
