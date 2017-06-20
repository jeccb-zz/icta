import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, removeVote, deleteIdea, fetchIdea } from '../actions/ideas';
import { Translate } from 'react-redux-i18n';

const IdeasListItem = withRouter(({idea, deleteIdea, voteUp, voteDown, removeVote, ideaClick, history, userId}) => (
  <li className={`list-group-item status-${idea.status.replace('_','-')}`}>
    <div className="row">
      <div className="col-xs-12" onClick={() => {ideaClick(idea, history)}}>
        <div className="row">
          <div className="col-xs-3">
            <span className={`label label-status-${idea.status.replace('_','-')}`}><Translate value={`idea.statuses.${idea.status}`} dangerousHTML /></span>
          </div>
          <div className="col-xs-9 author-field">
            &nbsp; {idea.author.name}
            <img className="small-profile-image" src={idea.author.image_url} />
          </div>
        </div>
      </div>

      <div className="col-xs-12 col-sm-6 col-sm-push-3 col-md-7 col-md-push-2 col-lg-8">
        <div className="row">
          <div className="col-xs-12 idea-text" onClick={() => {ideaClick(idea, history)}}>
            <div className="row">
              <div className="col-xs-12">
                <h4>{idea.title} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xs-6 col-sm-3 col-sm-pull-6 col-md-2 col-md-pull-7 col-lg-pull-8 list-item-thumbs">
        <div className="row">
          <div className="col-xs-12">
            <div className="thumbs-group text-center" >
              <div className="thumbs">
                <a onClick={() => {idea.my_vote === true ? removeVote(idea.id) : voteUp(idea.id)}}>
                  <i className={`fa fa-thumbs-up fa-2x ${idea.my_vote === true ? 'active' : ''}`}></i>
                </a><br />
                <span className="vote-count">{idea.up}</span><br />
              </div>
              <div className="thumbs">
                <a onClick={() => {idea.my_vote === false ? removeVote(idea.id) : voteDown(idea.id)}}>
                  <i className={`fa fa-thumbs-down fa-2x ${idea.my_vote === false ? 'active' : ''}`}></i>
                </a><br />
                <span className="vote-count">{idea.down}</span><br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-4 col-sm-2 col-lg-1 idea-comments-count text-right" onClick={() => {ideaClick(idea, history)}}>
        <i className="fa fa-comments-o fa-2x"></i> <span>{idea.comments_count}</span>
      </div>
      <div className="col-xs-2 col-sm-1 idea-actions text-center">
        { userId === idea.author.id ? <i onClick={() => {deleteIdea(idea.id)}} className="fa fa-trash fa-2x"></i> : '' }
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
  deleteIdea: (ideaId) => { dispatch(deleteIdea(ideaId)); },
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
