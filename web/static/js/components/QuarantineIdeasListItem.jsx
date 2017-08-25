import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { vote, removeVote, fetchIdea } from '../actions/ideas';
import { Translate } from 'react-redux-i18n';

const QuarantineIdeasListItem = withRouter(({idea, voteUp, voteDown, removeVote, ideaClick, history, userId}) => (
  <li className={`list-group-item status-${idea.status.replace('_','-')}`}>
    <div className="row">
      <div className="col-xs-8">
        <img className="profile-image small" src={idea.author.image_url} />
        &nbsp; {idea.author.name}
      </div>
      <div className="col-xs-4">
        <span className={`label status-${idea.status.replace('_','-')} pull-right`}>
          <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
        </span>
      </div>
      <div className="col-xs-8" onClick={() => {ideaClick(idea, history)}}>
        <h4 className="title">{idea.title}</h4>
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

QuarantineIdeasListItem.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(QuarantineIdeasListItem);
