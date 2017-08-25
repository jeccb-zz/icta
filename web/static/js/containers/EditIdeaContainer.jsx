import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EditIdea from '../components/EditIdea';
import { fetchIdea, editIdea } from '../actions/ideas';
import { getAllUsers } from '../actions/users';

class EditIdeaContainer extends Component {
  componentWillMount() {
    const { fetchIdea, ideaId, idea } = this.props;
    if (!idea || idea.id != ideaId) {
      fetchIdea(ideaId);
    }
  }

  render () {
    const {idea, onEdit, ideaId, fetchIdea, history, users, getAllUsers} = this.props;

    if (!idea || idea.id != ideaId) {
      return null;
    } else {
      return (
        <EditIdea
          idea={idea}
          users={users}
          getAllUsers={getAllUsers}
          onEditIdea={(attributes) => onEdit(idea.id, history, attributes)}
        />
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  fetchIdea: (ideaId) => {
    dispatch(fetchIdea(ideaId));
  },
  onEdit: (ideaId, history, attributes) => {
    dispatch(editIdea(ideaId, attributes, history));
  },
  getAllUsers: () => {
    dispatch(getAllUsers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIdeaContainer);
