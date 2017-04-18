import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowIdea from '../components/ShowIdea';

const ShowIdeaContainer = ({idea, ideaId}) => {
  return (
  <div>
    <ol className="breadcrumb">
      <li><Link to="/">List</Link></li>
      <li className="active">Show Idea</li>
    </ol>

    <ShowIdea idea={idea} id={ideaId} />
  </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  idea: state.currentIdea,
  ideaId: ownProps.match.params.id,
});

export default connect(mapStateToProps)(ShowIdeaContainer);
