import React, { PropTypes } from 'react';
import ReactMarkdown from 'react-markdown';

const ShowIdea = ({idea}) => (
    <div>
      <h1>{idea.title}</h1>
      <p>by <strong>{idea.author.name}</strong></p>
      <ReactMarkdown source={idea.body} />
    </div>
);

export default ShowIdea;
