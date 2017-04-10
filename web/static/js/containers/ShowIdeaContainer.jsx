import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShowIdea from '../components/ShowIdea';

const ShowIdeaContainer = ({idea}) => (
  <div>
    <ol className="breadcrumb">
      <li><Link to="/">List</Link></li>
      <li className="active">Show Idea</li>
    </ol>

    <ShowIdea idea={idea} />
  </div>
);

const mapStateToProps = state => ({
  idea: state.currentIdea,
});

export default connect(mapStateToProps)(ShowIdeaContainer);
