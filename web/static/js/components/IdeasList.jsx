import React, { Component, PropTypes } from 'react';
import IdeasListItem from './IdeasListItem';
import { connect } from 'react-redux';
import { addIdea } from '../actions/ideas'

const IdeasList = ({ideas, addIdea}) => {
  let input;

  const onClick = () => {
    addIdea(input.value);
  }

  return (
    <div>
      <h1> Ideas </h1>
      <input type="text" ref={(node) => { input = node }} />
      <button onClick={onClick} >Add Idea</button>
      <div className="ideasList list-group">
        { ideas.map((idea) => (<IdeasListItem key={idea.id} idea={idea} />)) }
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  ideas: state.ideas,
})

const mapDispatchToProps = dispatch => ({
  addIdea: (title) => {
    dispatch(addIdea(title));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(IdeasList);
