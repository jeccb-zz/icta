import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, deleteIdea, showIdea } from '../actions/ideas';

const IdeasListItem = withRouter(({idea, deleteIdea, voteUp, voteDown, ideaClick, history, userId}) => (
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
    <div className="col-xs-2 idea-actions">
      { userId === idea.author.id ? <i onClick={() => {deleteIdea(idea.id)}} className="fa fa-trash fa-2x"></i> : '' }
    </div>
  </div>
));

const mapStateToProps = state => ({
  userId: state.user.id,
});

const mapDispatchToProps = dispatch => ({
  voteUp: (ideaId) => { dispatch(vote(ideaId, true)); },
  voteDown: (ideaId) => { dispatch(vote(ideaId, false)); },
  deleteIdea: (ideaId) => { dispatch(deleteIdea(ideaId)); },
  ideaClick: (idea, history) => {
    history.push(`/ideas/show/${idea.id}`);
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

export default connect(mapStateToProps, mapDispatchToProps)(IdeasListItem);
