import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Comment from './Comment';
import NewComment from './NewComment';

const ShowIdea = ({idea, onAddComment}) => (
    <div className="col-sm-12">
      <p className="text-right">
        <img className="small-profile-image" src={idea.author.image_url} />
        &nbsp; <strong>{idea.author.name}</strong>
      </p>
      <div className="well well-sm">
        <h1>{idea.title}</h1>
        <hr />
        <ReactMarkdown source={idea.body} />
      </div>
      <br />
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4>Comments</h4>
        </div>
        <div className="panel-body">
          <NewComment onAddComment={onAddComment} />
        </div>
        <ul className="list-group">
          { idea.comments.map( c => <Comment key={c.id} body={c.body} createdAt={c.created_at} author={c.author} /> ) }
        </ul>
      </div>
    </div>
);

export default ShowIdea;
