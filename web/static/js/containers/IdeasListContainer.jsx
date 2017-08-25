import React, { PropTypes } from 'react';
import IdeasList from '../components/IdeasList';
import IdeasListItem from '../components/IdeasListItem';
import { connect } from 'react-redux';
import { changeFilterText, changeFilterStatus } from '../actions/ideas';

import IdeasFilter from '../components/IdeasFilter';

const IdeasListContainer = ({ideas}) => (
  <IdeasList ideas={ideas.map((idea) => (<IdeasListItem key={idea.id} idea={idea} />))} />
);

export default IdeasListContainer;
