import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, showIdea } from '../actions/ideas';

const IdeasListItem = withRouter(({idea, voteUp, voteDown, ideaClick, history}) => (
  <div className="list-group-item row">
    <div className="col-xs-1 text-center">
      <a onClick={() => {voteUp(idea.id)}}><i className={`fa fa-arrow-up ${idea.my_vote === true ? 'active' : ''}`}></i></a><br />
      {idea.up - idea.down}<br />
      <a onClick={() => {voteDown(idea.id)}}><i className={`fa fa-arrow-down ${idea.my_vote === false ? 'active' : ''}`}></i></a>
    </div>
    <div className="col-xs-9">
      <a onClick={() => {ideaClick(idea, history)}}><h3>{idea.title} ({idea.id})</h3></a>
    </div>
    <div className="col-xs-2">
      <h3>{idea.author}</h3>
    </div>
  </div>
));

const mapDispatchToProps = dispatch => ({
  voteUp: (ideaId) => { dispatch(vote(ideaId, true)); },
  voteDown: (ideaId) => { dispatch(vote(ideaId, false)); },
  ideaClick: (idea, history) => {
    dispatch(showIdea(idea.id, history));
  },
});

IdeasListItem.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  idea: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default connect(null, mapDispatchToProps)(IdeasListItem);
