import 'bootstrap-sass';

import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';

import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import rootReducer from './reducers/index';
import translationsObject from './i18n/i18n';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translationsObject));
store.dispatch(setLocale('pt-BR'));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
