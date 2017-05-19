import React, { PropTypes } from 'react';

const Comment = ({body, author, createdAt}) => (
  <li className="list-group-item">
    <div className="media">
      <div className="media-left">
        <img className="profileImage" src={author.image_url} />
      </div>
      <div className="media-body">
        <p>{body}</p>
        <p>By <strong>{author.name}</strong> at <strong>{createdAt}</strong></p>
      </div>
    </div>
  </li>
);

export default Comment;
