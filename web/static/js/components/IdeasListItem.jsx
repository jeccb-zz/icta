import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, deleteIdea, showIdea } from '../actions/ideas';

const IdeasListItem = withRouter(({idea, deleteIdea, voteUp, voteDown, ideaClick, history, userId}) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-xs-1 text-center">
        <div className="thumbs">
          <a onClick={() => {voteUp(idea.id)}}>
            <i className={`fa fa-thumbs-up fa-2x ${idea.my_vote === true ? 'active' : ''}`}></i>
          </a><br />
          <span className="vote-count">{idea.up}</span><br />
        </div>
        <div className="thumbs">
          <a onClick={() => {voteDown(idea.id)}}>
            <i className={`fa fa-thumbs-down fa-2x ${idea.my_vote === false ? 'active' : ''}`}></i>
          </a><br />
          <span className="vote-count">{idea.down}</span><br />
        </div>
      </div>
      <div className="col-xs-9" onClick={() => {ideaClick(idea, history)}}>
        <h4>{idea.title}</h4>
        <p className="author">
          <img className="small-profile-image" src={idea.author.image_url} />
          &nbsp; <strong>{idea.author.name}</strong>
        </p>
      </div>
      <div className="col-xs-1 idea-actions">
        { userId === idea.author.id ? <i onClick={() => {deleteIdea(idea.id)}} className="fa fa-trash fa-2x"></i> : '' }
      </div>
      <div className="col-xs-1 idea-comments-count" onClick={() => {ideaClick(idea, history)}}>
        <i className="fa fa-comments-o fa-2x"></i> <span>{idea.comments_count}</span>
      </div>
    </div>
  </li>
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
