import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditIdea from '../components/EditIdea';
import { fetchIdea, editIdea } from '../actions/ideas';
import { getAllUsers as fetchAllUsers } from '../actions/users';

class EditIdeaContainer extends Component {
  componentWillMount() {
    const { getIdea, ideaId, idea } = this.props;
    if (!idea || Number(idea.id) !== Number(ideaId)) {
      getIdea(ideaId);
    }
  }

  render() {
    const { idea, onEdit, ideaId, history, users, getAllUsers } = this.props;

    if (!idea || Number(idea.id) !== Number(ideaId)) {
      return null;
    }

    return (
      <EditIdea
        idea={idea}
        users={users}
        getAllUsers={getAllUsers}
        onEditIdea={attributes => onEdit(idea.id, history, attributes)}
      />
    );
  }
}

EditIdeaContainer.propTypes = {
  ideaId: PropTypes.string.isRequired,
  idea: PropTypes.shape({
    id: PropTypes.number,
  }),
  users: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]).isRequired,
  history: PropTypes.object.isRequired,
  getIdea: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

EditIdeaContainer.defaultProps = {
  idea: null,
};

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  getIdea: (ideaId) => {
    dispatch(fetchIdea(ideaId));
  },
  onEdit: (ideaId, history, attributes) => {
    dispatch(editIdea(ideaId, attributes, history));
  },
  getAllUsers: () => {
    dispatch(fetchAllUsers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditIdeaContainer);
