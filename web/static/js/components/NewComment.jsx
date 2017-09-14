import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';

const NewComment = ({ onAddComment }) => {
  let body;

  const onSubmit = (e) => {
    e.preventDefault();
    if (!body.value) {
      return;
    }

    onAddComment(body.value);
    body.value = '';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <textarea ref={(node) => { body = node; }} className="form-control" id="body" />
        </div>
        <div className="form-group text-right">
          <button type="submit" className="btn btn-primary">
            <Translate value="idea.comments.new" />
          </button>
        </div>
      </form>
    </div>
  );
};

NewComment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default NewComment;
