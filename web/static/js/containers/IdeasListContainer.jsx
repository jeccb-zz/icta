import React, { PropTypes } from 'react';
import IdeasList from '../components/IdeasList';
import { connect } from 'react-redux';
import { changeFilterText, changeFilterStatus } from '../actions/ideas';

import IdeasFilter from '../components/IdeasFilter';

const visibleIdeas = (ideas, filter) => {
  console.log(filter.status);
  let filteredIdeas = [...ideas];
  if (filter.text.length > 0) {
    filteredIdeas = filteredIdeas.filter(i => i.title.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1);
  }

  return filteredIdeas.filter(i => filter.status.includes(i.status));
}

const IdeasListContainer = ({ideas, filter, onChangeFilterText, onChangeFilterStatus}) => (
  <div>
    <IdeasFilter filter={filter} onChange={onChangeFilterText} onClickStatus={onChangeFilterStatus}/>
    <IdeasList ideas={ideas}/>
  </div>
);

const mapStateToProps = (state) => ({
  ideas: visibleIdeas(state.ideas, state.filter),
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilterText: (event) => {
    dispatch(changeFilterText(event.target.value));
  },
  onChangeFilterStatus: (status) =>  () => {
    dispatch(changeFilterStatus(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IdeasListContainer);
