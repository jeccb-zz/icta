import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowIdea from '../components/ShowIdea';
import { fetchIdea, addComment, deleteIdea } from '../actions/ideas';

class ShowIdeaContainer extends Component {
  componentWillMount() {
    const { fetchIdea, ideaId } = this.props;
    fetchIdea(ideaId);
  }

  render () {
    const {idea, history, onAddComment, onDelete, currentUser} = this.props;

    if (idea === null || idea.loading) {
      return null
    } else {
      return (
        <ShowIdea
          idea={idea}
          currentUser={currentUser}
          onAddComment={(body) => onAddComment(idea.id, body)}
          onDeleteIdea={() => onDelete(idea.id, history)}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
  currentUser: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchIdea: (ideaId) => {
    dispatch(fetchIdea(ideaId));
  },
  onAddComment: (ideaId, body) => {
    dispatch(addComment(ideaId, body));
  },
  onDelete: (ideaId, history) => {
    dispatch(deleteIdea(ideaId, history));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowIdeaContainer);
