import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions/ideas';

const IdeasListItem = ({idea, voteUp, voteDown}) => (
  <li>
    {idea.up - idea.down}: {idea.id} - {idea.title}
    <button onClick={() => {voteUp(idea.id)}}>/\</button>
    <button onClick={() => {voteDown(idea.id)}}>\/</button></li>
);

const mapDispatchToProps = dispatch => ({
  voteUp: (ideaId) => { dispatch(vote(ideaId, true)); },
  voteDown: (ideaId) => { dispatch(vote(ideaId, false)); },
});

export default connect(null, mapDispatchToProps)(IdeasListItem);
