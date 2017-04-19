import React, { PropTypes } from 'react';

const Comment = ({body, author, createdAt}) => (
  <div className="list-group-item">
    <div className="row">
      <div className="pull-left comment-user-image">
        <img className="profileImage" src={author.image_url} />
      </div>
      <div className="col-xs-11">
        <p>{body}</p>
        <p>By <strong>{author.name}</strong> at <strong>{createdAt}</strong></p>
      </div>
    </div>
  </div>
);

export default Comment;
