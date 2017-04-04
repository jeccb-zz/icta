import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { vote } from '../actions/ideas';

const IdeasListItem = ({idea, voteUp, voteDown}) => (
  <div className="list-group-item row">
    <div className="col-xs-1 text-center">
      <a onClick={() => {voteUp(idea.id)}}><i className="fa fa-arrow-up"></i></a><br />
      {idea.up - idea.down}<br />
      <a onClick={() => {voteDown(idea.id)}}><i className="fa fa-arrow-down"></i></a>
    </div>
    <div className="col-xs-11">
      <h2>{idea.title} ({idea.id})</h2>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  voteUp: (ideaId) => { dispatch(vote(ideaId, true)); },
  voteDown: (ideaId) => { dispatch(vote(ideaId, false)); },
});

export default connect(null, mapDispatchToProps)(IdeasListItem);
