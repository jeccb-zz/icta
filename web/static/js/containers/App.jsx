import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IdeasListContainer from './IdeasListContainer';

const App = () => (
  <IdeasListContainer/>
)

export default connect()(App);
