import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Translate } from 'react-redux-i18n';

const QuarantineIdeasListItem = withRouter(({ idea, ideaClick, history }) => (
  <li className={`list-group-item status-${idea.status.replace('_', '-')}`}>
    <div className="row">
      <div className="col-xs-8">
        <img className="profile-image small" src={idea.author.image_url} alt="profile" />
        &nbsp; {idea.author.name}
      </div>
      <div className="col-xs-4">
        <span className={`label status-${idea.status.replace('_', '-')} pull-right`}>
          <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
        </span>
      </div>
      <div className="col-xs-8" onClick={() => { ideaClick(idea, history); }}>
        <h4 className="title">{idea.title}</h4>
      </div>
    </div>
  </li>
));

const mapStateToProps = state => ({
  userId: state.user.id,
});

const mapDispatchToProps = () => ({
  ideaClick: (idea, history) => {
    history.push(`/ideas/show/${idea.id}`);
  },
});

QuarantineIdeasListItem.propTypes = {
  idea: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(QuarantineIdeasListItem);
