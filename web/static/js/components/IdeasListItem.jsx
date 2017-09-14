import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

import { vote, removeVote } from '../actions/ideas';

const IdeasListItem = withRouter(({ idea, clickUp, clickDown, ideaClick, history }) => (
  <li className={`list-group-item status-${idea.status.replace('_', '-')}`}>
    <div className="row">
      <div className="col-xs-8">
        <img className="profile-image small" alt="profile" src={idea.author.image_url} />
        &nbsp; {idea.author.name}
      </div>
      <div className="col-xs-4" onClick={(e) => { ideaClick(e, idea, history); }}>
        <span className={`label status-${idea.status.replace('_', '-')} pull-right`}>
          <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
        </span>
      </div>
      <div className="col-xs-12" onClick={(e) => { ideaClick(e, idea, history); }}>
        <a onClick={(e) => { ideaClick(e, idea, history); }}>
          <h4 className="title">{idea.title}</h4>
        </a>
      </div>
    </div>
    <div className="row actions">
      <div className="col-xs-8">
        <div className="item">
          <a onClick={(e) => { clickUp(e, idea); }} >
            <i className={`fa fa-thumbs-up ${idea.my_vote === true ? 'active' : ''}`} />
          </a>
          <span>{idea.up}</span>
        </div>
        <div className="item">
          <a onClick={(e) => { clickDown(e, idea); }} >
            <i className={`fa fa-thumbs-down ${idea.my_vote === false ? 'active' : ''}`} />
          </a>
          <span>{idea.down}</span>
        </div>
      </div>
      <div className="col-xs-4 item text-right">
        <a onClick={(e) => { ideaClick(e, idea, history); }}>
          <i className="fa fa-comments-o" />
        </a>
        <span>{idea.comments_count}</span>
      </div>
    </div>
  </li>
));

const clickVote = (e, dispatch, currentVote, newVote, ideaId) => {
  e.preventDefault();
  if (currentVote === newVote) {
    dispatch(removeVote(ideaId));
  } else {
    dispatch(vote(ideaId, newVote));
  }
};

const mapDispatchToProps = dispatch => ({
  clickUp: (e, idea) => { clickVote(e, dispatch, idea.my_vote, true, idea.id); },
  clickDown: (e, idea) => { clickVote(e, dispatch, idea.my_vote, false, idea.id); },
  ideaClick: (e, idea, history) => {
    history.push(`/ideas/show/${idea.id}`);
    e.preventDefault();
  },
});

IdeasListItem.propTypes = {
  clickUp: PropTypes.func.isRequired,
  clickDown: PropTypes.func.isRequired,
  idea: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(IdeasListItem);
