import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { Router, Route } from 'react-router';

import { syncHistoryWithStore } from 'react-router-redux';

import IdeasListContainer from './containers/IdeasListContainer';
import rootReducer from './reducers/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

const history = syncHistoryWithStore(createBrowserHistory(), store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={IdeasListContainer} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
