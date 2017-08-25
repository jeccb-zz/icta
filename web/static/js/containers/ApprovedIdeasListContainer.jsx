import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import IdeasListContainer from './IdeasListContainer';
import IdeasFilter from '../components/IdeasFilter';

const visibleIdeas = (ideas, filter) => {
  let filteredIdeas = [...ideas];
  if (filter.text.length > 0) {
    filteredIdeas = filteredIdeas
      .filter(i => i.title.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1);
  }

  return filteredIdeas.filter(i => filter.status.includes(i.status));
}

const ApprovedIdeasListContainer = ({ideas, filter, onChangeFilterText, onChangeFilterStatus}) => (
  <div>
    <IdeasFilter filter={filter} onChange={onChangeFilterText} onClickStatus={onChangeFilterStatus}/>
    <IdeasListContainer ideas={ideas} />
  </div>
);

const mapStateToProps = (state) => ({
  ideas: visibleIdeas(state.ideas.filter((i) => (i.status !== 'under_review')), state.ideaFilter),
  filter: state.ideaFilter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilterText: (event) => {
    dispatch(changeFilterText(event.target.value));
  },
  onChangeFilterStatus: (status) =>  () => {
    dispatch(changeFilterStatus(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedIdeasListContainer);
