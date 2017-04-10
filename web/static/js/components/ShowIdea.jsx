import React, { PropTypes } from 'react';

const ShowIdea = ({idea}) => (
  <div>
    <h1>{idea.title}</h1>
    <p>by <strong>{idea.author}</strong></p>
    <p>{idea.body}</p>
    <</p>/div>
);

export default ShowIdea;
