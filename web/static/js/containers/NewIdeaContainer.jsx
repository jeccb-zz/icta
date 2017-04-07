import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addIdea } from '../actions/ideas'
import NewIdea from '../components/NewIdea';

const NewIdeaContainer = ({onAddIdea, loading}) => (
  <NewIdea onAddIdea={onAddIdea} loading={loading}/>
);

const mapDispatchToProps = dispatch => ({
  onAddIdea: (title, body) => {
    dispatch(addIdea(title, body));
  }
});

const mapStateToProps = state => ({
  loading: state.newIdea.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(NewIdeaContainer);
