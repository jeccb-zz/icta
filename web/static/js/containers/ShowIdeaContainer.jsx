import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowIdea from '../components/ShowIdea';
import { showIdea, addComment } from '../actions/ideas';

const ShowIdeaContainer = ({idea, showIdea, onAddComment, ideaId}) => {
  if (!idea || idea.id != ideaId) {
    showIdea(ideaId);
    return null;
  } else {
    return (<ShowIdea idea={idea} onAddComment={(body) => onAddComment(idea.id, body)}/>);
  }
}

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch) => ({
  showIdea: (ideaId) => {
    dispatch(showIdea(ideaId));
  },
  onAddComment: (ideaId, body) => {
    dispatch(addComment(ideaId, body));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowIdeaContainer);
