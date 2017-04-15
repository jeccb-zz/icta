import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, showIdea } from '../actions/ideas';

const IdeasListItem = withRouter(({idea, voteUp, voteDown, ideaClick, history, userId}) => (
  <div className="list-group-item row">
    <div className="col-xs-1 text-center">
      <a onClick={() => {voteUp(idea.id)}}><i className={`fa fa-caret-up fa-2x ${idea.my_vote === true ? 'active' : ''}`}></i></a><br />
      <span className="vote-count">{idea.up - idea.down}</span><br />
      <a onClick={() => {voteDown(idea.id)}}><i className={`fa fa-caret-down fa-2x ${idea.my_vote === false ? 'active' : ''}`}></i></a>
    </div>
    <div className="col-xs-9" onClick={() => {ideaClick(idea, history)}}>
      <div className="row">
        <div className="col-xs-12">
          <h4>{idea.title}</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12">
          By <strong>{idea.author.name}</strong>
        </div>
      </div>
    </div>
    <div className="col-xs-2">
      <h3>{idea.author.name}</h3>
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
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default connect(null, mapDispatchToProps)(IdeasListItem);
