import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { showIdea } from '../actions/ideas';

const ShowIdea = ({idea, history, showIdea, id}) => {
  if (!idea) {
    showIdea(id, history);
  }

  const IdeaInfo = (idea) => (
    <div>
      <h1>{idea.title}</h1>
      <p>by <strong>{idea.author.name}</strong></p>
      <ReactMarkdown source={idea.body} />
    </div>
  )


  return (<div>{idea ? IdeaInfo(idea) : ''}</div>);
};

const mapDispatchToProps = (dispatch) => ({
  showIdea: (ideaId, history) => {
    dispatch(showIdea(ideaId, history));
  }
});


export default connect(null, mapDispatchToProps)(ShowIdea);
