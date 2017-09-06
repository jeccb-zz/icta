import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addIdea } from '../actions/ideas';
import NewIdea from '../components/NewIdea';

const NewIdeaContainer = ({ onAddIdea, loading, history }) => (
  <NewIdea onAddIdea={onAddIdea(history)} loading={loading} />
);

NewIdeaContainer.propTypes = {
  onAddIdea: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  onAddIdea: history => (title, body, category) => {
    dispatch(addIdea(title, body, category, history));
  },
});

const mapStateToProps = state => ({
  loading: state.newIdea.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewIdeaContainer);
