import React, { Component, PropTypes } from 'react';
import { fetchIdeas, getUser } from '../actions/ideas';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import IdeasListContainer from './IdeasListContainer';
import NewIdeaContainer from './NewIdeaContainer';
import ShowIdeaContainer from './ShowIdeaContainer';
import Header from '../components/Header';

const history = createBrowserHistory();

class App extends Component {
  componentWillMount() {
    let { getIdeas, getUser } = this.props;
    getIdeas();
    getUser();
  }

  render() {
    return (
      <div>
        <Router history={history}>
          <div>
            <Header />
            <div className="container-fluid">
              <main role="main">
                <Route exact path="/" component={IdeasListContainer} />
                <Route path="/ideas/new" component={NewIdeaContainer} />
                <Route path="/ideas/show/:id" component={ShowIdeaContainer} />
              </main>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getIdeas: () => {
    dispatch(fetchIdeas());
  },
  getUser: () => {
    dispatch(getUser());
  },
});

export default connect(null, mapDispatchToProps)(App);
