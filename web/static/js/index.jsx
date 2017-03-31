import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import ideaApp from './reducers';

const createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware)(createStore));

const store = createStoreWithMiddleware(ideaApp);

render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('root')
);
