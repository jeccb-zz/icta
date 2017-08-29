import React, { Component, PropTypes } from 'react';
import { showIdeas } from '../actions/ideas';
import { getUser } from '../actions/users';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Notifications from 'react-notification-system-redux';

import ApprovedIdeasListContainer from './ApprovedIdeasListContainer';
import QuarantineIdeasListContainer from './QuarantineIdeasListContainer';
import MyIdeasListContainer from './MyIdeasListContainer';
import NewIdeaContainer from './NewIdeaContainer';
import ShowIdeaContainer from './ShowIdeaContainer';
import EditIdeaContainer from './EditIdeaContainer';
import UserListContainer from './UserListContainer';
import Header from '../components/Header';

const history = createBrowserHistory();

class App extends Component {
  componentWillMount() {
    let { getIdeas, getUser } = this.props;
    getIdeas();
    getUser();
  }

  render() {
    const {notifications} = this.props;

    return (
      <div>
        <Router history={history}>
          <div>
            <Notifications notifications={notifications} />
            <Header />
            <div className="container-fluid">
              <main role="main">
                <Route exact path="/" component={ApprovedIdeasListContainer} />
                <Route path="/quarantine" component={QuarantineIdeasListContainer} />
                <Route path="/my_ideas" component={MyIdeasListContainer} />
                <Route path="/ideas/new" component={NewIdeaContainer} />
                <Route path="/ideas/show/:id" component={ShowIdeaContainer} />
                <Route path="/ideas/edit/:id" component={EditIdeaContainer} />
                <Route path="/users" component={UserListContainer} />
              </main>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notifications: state.notifications,
});

const mapDispatchToProps = dispatch => ({
  getIdeas: () => {
    dispatch(showIdeas());
  },
  getUser: () => {
    dispatch(getUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
