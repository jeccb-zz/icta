import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Translate, I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

import Comment from './Comment';
import NewComment from './NewComment';

const confirmDelete = (onDeleteIdea) => {
  // TODO: Y U CONFIRM?
  if (confirm(I18n.t('confirm_message'))) { // eslint-disable-line no-alert
    onDeleteIdea();
  }
};

const ShowIdea = ({ idea, onAddComment, onDeleteIdea, currentUser }) => (
  <div className="show-idea">
    <div className="row">
      <div className="col-xs-4">
        <p>
          <Link className="btn btn-sm btn-primary" to="/">
            <i className="fa fa-chevron-left" /> &nbsp;
            <Translate value="back" />
          </Link>
        </p>
      </div>
      <div className="col-xs-8 text-right">
        <p>
          { idea.author.id === currentUser.id || idea.owner.id === currentUser.id ?
            <Link className="btn btn-sm btn-primary" to={`/ideas/edit/${idea.id}`}>
              <i className="fa fa-pencil" /> &nbsp;<Translate value="edit" />
            </Link>
            : ''
          }
          &nbsp; { idea.author.id === currentUser.id ? <button
            onClick={() => { confirmDelete(onDeleteIdea); }}
            className="btn btn-sm btn-danger"
          >
            <i className="fa fa-trash" /> &nbsp;<Translate value="delete" />
          </button> : '' }
        </p>
      </div>
    </div>
    <div className={`well well-sm status-${idea.status.replace('_', '-')}`}>
      <div className="row">
        <div className="col-md-2">
          { idea.owner.id ? <p> <strong><Translate value="idea.owner" />:</strong><br />
            <img className="profile-image small" src={idea.owner.image_url} alt="profile" />
            &nbsp; <strong>{idea.owner.name}</strong>
          </p> : '' }
          <p>
            <strong><Translate value="idea.author" />:</strong><br />
            <img className="profile-image small" src={idea.author.image_url} alt="profile" />
            &nbsp; <strong>{idea.author.name}</strong>
          </p>
          <p>
            <strong><Translate value="idea.status" />: &nbsp;</strong><br />
            <span className={`label status-${idea.status.replace('_', '-')}`}>
              <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
            </span>
          </p>
          <p>
            <strong><Translate value="idea.category" />: &nbsp;</strong><br />
            <span className="label category">
              <Translate value={`idea.categories.${idea.category}`} dangerousHTML />
            </span>
          </p>
        </div>
        <div className="col-md-10">
          <h1>{idea.title}</h1>
          <hr />
          <ReactMarkdown source={idea.body} />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-xs-12">
        <br />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4><Translate value="idea.comments.title" /></h4>
          </div>
          <div className="panel-body">
            <NewComment onAddComment={onAddComment} />
          </div>
          <ul className="list-group">
            { idea.comments.map(c =>
              <Comment key={c.id} body={c.body} createdAt={c.created_at} author={c.author} />) }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

ShowIdea.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.number,
      image_url: PropTypes.string,
      name: PropTypes.string,
    }),
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
    })).isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
  }).isRequired,
  onAddComment: PropTypes.func.isRequired,
  onDeleteIdea: PropTypes.func.isRequired,
};

export default ShowIdea;
