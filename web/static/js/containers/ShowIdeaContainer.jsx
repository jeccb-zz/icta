import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowIdea from '../components/ShowIdea';
import { showIdea } from '../actions/ideas';

const ShowIdeaContainer = ({idea, showIdea, ideaId, history}) => {
  if (!idea) {
    showIdea(ideaId, history);
    return null;
  } else {
    return (<ShowIdea idea={idea} />);
  }
}

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch) => ({
  showIdea: (ideaId, history) => {
    dispatch(showIdea(ideaId, history));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowIdeaContainer);
