import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import { createBrowserHistory } from 'history';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import IdeasListContainer from './containers/IdeasListContainer';
import NewIdeaContainer from './containers/NewIdeaContainer';
import rootReducer from './reducers/index';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunkMiddleware)
));

const history = createBrowserHistory();

render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Route exact path="/" component={IdeasListContainer} />
        <Route path="/new_idea" component={NewIdeaContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
