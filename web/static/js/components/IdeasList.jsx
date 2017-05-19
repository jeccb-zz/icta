import React, { PropTypes } from 'react';
import IdeasListItem from './IdeasListItem';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const IdeasList = ({ideas}) => (
  <div className="col-sm-12">
    <ul className="list-group">
      { ideas.map((idea) => (<IdeasListItem key={idea.id} idea={idea} />)) }
    </ul>
  </div>
);

const mapStateToProps = state => ({
  ideas: state.ideas,
})

export default connect(mapStateToProps)(IdeasList);
