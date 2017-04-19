import React, { PropTypes } from 'react';

const Comment = ({body, author, createdAt}) => (
  <div className="list-group-item">
    <p>{body}</p>
    <p>By <strong>{author.name}</strong> at <strong>{createdAt}</strong></p>
  </div>
);

export default Comment;
