import React from 'react';
import PropTypes from 'prop-types';
import { Translate, I18n } from 'react-redux-i18n';

const Comment = ({ body, author, createdAt }) => (
  <li className="list-group-item">
    <div className="media">
      <div className="media-left">
        <img className="profile-image small" src={author.image_url} alt="profile" />
      </div>
      <div className="media-body">
        <p>{body}</p>
        <p><Translate value="idea.comments.by" name={author.name} date={I18n.l(createdAt, { dateFormat: 'datetime' })} dangerousHTML /></p>
      </div>
    </div>
  </li>
);

Comment.propTypes = {
  author: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default Comment;
