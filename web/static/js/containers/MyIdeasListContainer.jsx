import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import IdeasListContainer from './IdeasListContainer';
import IdeasFilter from '../components/IdeasFilter';

const MyIdeasListContainer = ({ideas, filter, onChangeFilterText, onChangeFilterStatus}) => (
  <div>
    <IdeasListContainer ideas={ideas} />
  </div>
);

const mapStateToProps = (state) => ({
  ideas: state.ideas.filter((i) => (i.author.id === state.user.id)),
  filter: state.ideaFilter,
});

export default connect(mapStateToProps)(MyIdeasListContainer);
