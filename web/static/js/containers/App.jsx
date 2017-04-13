import React, { Component, PropTypes } from 'react';
import { fetchIdeas, getUser } from '../actions/ideas';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { BrowserRouter as Router, Route } from 'react-router-dom'

import IdeasListContainer from './IdeasListContainer';
import NewIdeaContainer from './NewIdeaContainer';
import ShowIdeaContainer from './ShowIdeaContainer';

const history = createBrowserHistory();

class App extends Component {
  componentDidMount() {
    let { getIdeas } = this.props;
    getIdeas();
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={IdeasListContainer} />
          <Route path="/ideas/new" component={NewIdeaContainer} />
          <Route path="/ideas/show/:id" component={ShowIdeaContainer} />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getIdeas: () => {
    dispatch(fetchIdeas());
  },
});

App.propTypes = {
  getIdeas: React.PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(App);
