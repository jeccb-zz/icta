import React, { Component, PropTypes } from 'react';
import { fetchIdeas } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    let { dispatch } = this.props;
    console.log("SUP");

    dispatch(fetchIdeas());
  }

  render() {
    return (
      <div>Hello World :)</div>
    )
  }
}

export default connect()(App);
