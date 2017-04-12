import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addIdea } from '../actions/ideas'
import NewIdea from '../components/NewIdea';

const NewIdeaContainer = ({onAddIdea, loading, history}) => (
  <NewIdea onAddIdea={onAddIdea(history)} loading={loading}/>
);

const mapDispatchToProps = dispatch => ({
  onAddIdea: (history) => (title, body) => {
    dispatch(addIdea(title, body, history));
  }
});

const mapStateToProps = state => ({
  loading: state.newIdea.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewIdeaContainer);
