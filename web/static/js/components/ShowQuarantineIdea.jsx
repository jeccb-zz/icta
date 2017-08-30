import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Comment from './Comment';
import NewComment from './NewComment';
import { Translate, I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

const ShowQuarantineIdea = ({idea, currentUser, onAddComment, onApprove, onDeny}) => (
  <div className="show-idea">
    <div className="row">
      <div className="col-xs-4">
        <p>
          <Link className="btn btn-sm btn-default" to="/">
            <i className="fa fa-chevron-left"></i> &nbsp;
            <Translate value="back" />
          </Link>
        </p>
      </div>
      <div className="col-xs-8 text-right">
        <p>
          { idea.author.id == currentUser.id || idea.owner.id == currentUser.id ?
            <Link className="btn btn-sm btn-primary" to={`/ideas/edit/${idea.id}`}><i className="fa fa-pencil"></i> &nbsp;<Translate value="edit" /></Link>
            : ''
          }
        </p>
      </div>
    </div>
    <div className={`well well-sm status-${idea.status.replace('_','-')}`}>
      <div className="row">
        <div className="col-md-2">
          <div className="row">
            <div className="col-xs-12">
              { idea.owner.id ? <p> <strong><Translate value="idea.owner" />:</strong><br />
                <img className="profile-image small" src={idea.owner.image_url} />
                &nbsp; <strong>{idea.owner.name}</strong>
              </p> : '' }
              <p>
                <strong><Translate value="idea.author" />:</strong><br />
                <img className="profile-image small" src={idea.author.image_url} />
                &nbsp; <strong>{idea.author.name}</strong>
              </p>
              <p>
                <strong><Translate value="idea.status" />: &nbsp;</strong><br />
                <span className={`label status-${idea.status.replace('_','-')}`}>
                  <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
                </span>
              </p>
              <p>
                <strong><Translate value="idea.category" />: &nbsp;</strong><br />
                <span className="label category">
                  <Translate value={`idea.categories.${idea.category}`} dangerousHTML />
                </span>
              </p>
              <p> <strong><Translate value="idea.quarantine.approved" />?</strong> </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-5 col-xs-2">
              <button className="btn btn-sm btn-success" onClick={onApprove}>
                <i className="fa fa-check-circle"></i> &nbsp;
                <Translate value="idea.quarantine.approve" />
              </button>
            </div>
            <div className="col-md-5 col-xs-2">
              <button className="btn btn-sm btn-danger" onClick={onDeny}>
                <i className="fa fa-times-circle"></i> &nbsp;
                <Translate value="idea.quarantine.deny" />
              </button>
            </div>
          </div>
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
            <h4><Translate value='idea.comments.title' /></h4>
          </div>
          <div className="panel-body">
            <NewComment onAddComment={onAddComment} />
          </div>
          <ul className="list-group">
            { idea.comments.map( c => <Comment key={c.id} body={c.body} createdAt={c.created_at} author={c.author} /> ) }
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default ShowQuarantineIdea;
