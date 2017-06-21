import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, removeVote, fetchIdea } from '../actions/ideas';
import { Translate } from 'react-redux-i18n';

const IdeasListItem = withRouter(({idea, voteUp, voteDown, removeVote, ideaClick, history, userId}) => (
  <li className={`list-group-item status-${idea.status.replace('_','-')}`}>
    <div className="row">
      <div className="col-xs-8">
        <img className="profile-image small" src={idea.author.image_url} />
        &nbsp; {idea.author.name}
      </div>
      <div className="col-xs-4" onClick={() => {ideaClick(idea, history)}}>
        <span className={`label status-${idea.status.replace('_','-')} pull-right`}>
          <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
        </span>
      </div>
      <div className="col-xs-12" onClick={() => {ideaClick(idea, history)}}>
        <a href="javascript:void(0);" onClick={() => {ideaClick(idea, history)}}>
          <h4 className="title">{idea.title}</h4>
        </a>
      </div>
    </div>
    <div className="row actions">
      <div className="col-xs-8">
        <div className="item">
          <a href="javascript:void(0);" onClick={() => {idea.my_vote === true ? removeVote(idea.id) : voteUp(idea.id)}}>
            <i className={`fa fa-thumbs-up ${idea.my_vote === true ? 'active' : ''}`}></i>
          </a>
          <span>{idea.up}</span>
        </div>
        <div className="item">
          <a href="javascript:void(0);" onClick={() => {idea.my_vote === false ? removeVote(idea.id) : voteDown(idea.id)}}>
            <i className={`fa fa-thumbs-down ${idea.my_vote === false ? 'active' : ''}`}></i>
          </a>
          <span>{idea.down}</span>
        </div>
      </div>
      <div className="col-xs-4 item text-right">
        <a href="javascript:void(0);" onClick={() => {ideaClick(idea, history)}}>
          <i className="fa fa-comments-o"></i>
        </a>
        <span>{idea.comments_count}</span>
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
  removeVote: (ideaId) => { dispatch(removeVote(ideaId)); },
  ideaClick: (idea, history) => {
    history.push(`/ideas/show/${idea.id}`);
  },
});

IdeasListItem.propTypes = {
  voteUp: PropTypes.func.isRequired,
  voteDown: PropTypes.func.isRequired,
  removeVote: PropTypes.func.isRequired,
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
