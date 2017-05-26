import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Comment from './Comment';
import NewComment from './NewComment';
import { Translate, I18n } from 'react-redux-i18n';
import { Link } from 'react-router-dom';

const ShowIdea = ({idea, onAddComment, currentUser}) => (
  <div className="show-idea">
    <div className="row">
      <div className="col-xs-9">
      </div>
      <div className="col-xs-3">
        <p className="text-right">
          <img className="small-profile-image" src={idea.author.image_url} />
          &nbsp; <strong>{idea.author.name}</strong>
        </p>
      </div>
    </div>
    <div className="row title">
      <div className="col-xs-12">
        <div className="well well-sm">
          <div className="row">
            <div className="col-xs-10">
              <h1> {idea.title}</h1>
              <h4>
                <span className={`label label-status-${idea.status}`}>
                  <Translate value={`idea.statuses.${idea.status}`} dangerousHTML />
                </span>
              </h4>
            </div>
            <div className="col-xs-2 text-right">
              { idea.author.id == currentUser.id ?
                  <Link className="btn btn-primary" to={`/ideas/edit/${idea.id}`}><i className="fa fa-pencil"></i> Editar</Link>
                  : ''
              }
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-xs-12">
              <ReactMarkdown source={idea.body} />
            </div>
          </div>
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

export default ShowIdea;
