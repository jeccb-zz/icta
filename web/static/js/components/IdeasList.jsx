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
      <input type="text" ref={(node) => { input = node }} />
      <button onClick={onClick} />
      <ul className="ideasList">
        { ideas.map((idea) => (<IdeasListItem idea={idea} />)) }
      </ul>
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
