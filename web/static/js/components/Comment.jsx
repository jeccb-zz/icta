import React, { PropTypes } from 'react';
import { Translate, I18n } from 'react-redux-i18n';

const Comment = ({body, author, createdAt}) => (
  <li className="list-group-item">
    <div className="media">
      <div className="media-left">
        <img className="profile-image" src={author.image_url} />
      </div>
      <div className="media-body">
        <p>{body}</p>
        <p><Translate value="idea.comments.by" name={author.name} date={I18n.l(createdAt, { dateFormat: 'datetime'})} dangerousHTML /></p>
      </div>
    </div>
  </li>
);

export default Comment;
