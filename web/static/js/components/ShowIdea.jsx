import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';
import Comment from './Comment';
import NewComment from './NewComment';

const ShowIdea = ({idea, onAddComment}) => (
    <div>
      <h1>{idea.title}</h1>
      <p>by <strong>{idea.author.name}</strong></p>
      <ReactMarkdown source={idea.body} />
      <hr/>
      <NewComment onAddComment={onAddComment} />
      <div className="comments list-group">
        { idea.comments.map( c => <Comment key={c.id} body={c.body} createdAt={c.created_at} author={c.author} /> ) }
      </div>
    </div>
);

export default ShowIdea;
