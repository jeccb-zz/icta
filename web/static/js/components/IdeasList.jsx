import React, { PropTypes } from 'react';
import IdeasListItem from './IdeasListItem';
import { connect } from 'react-redux';
import { addIdea } from '../actions/ideas'
import { Link } from 'react-router-dom'

const IdeasList = ({ideas, addIdea}) => (
  <div>

    <ol className="breadcrumb">
      <li className="active">List</li>
    </ol>

    <div className="page-header"><h1> Ideas </h1></div>

    <div className="row">
      <div className="col-xs-8">
        <Link to="/new_idea" className="btn btn-primary btn-lg">Add Idea</Link>
      </div>
    </div>

    <div className="row">
      <div className="col-xs-12">
        <div className="ideasList list-group">
          { ideas.map((idea) => (<IdeasListItem key={idea.id} idea={idea} />)) }
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  ideas: state.ideas,
})

const mapDispatchToProps = dispatch => ({
  addIdea: () => {
    dispatch(push('/new_idea'));
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(IdeasList);
