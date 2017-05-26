import React, { PropTypes } from 'react';
import IdeasList from '../components/IdeasList';
import { connect } from 'react-redux';
import { changeFilterText } from '../actions/ideas';

import IdeasFilter from '../components/IdeasFilter';

const visibleIdeas = (ideas, filter) => {
  if (filter.text.length > 0) {
    return ideas.filter(i => i.title.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1)
  } else {
    return ideas;
  }
}

const IdeasListContainer = ({ideas, filter, onChangeFilter}) => (
  <div>
    <IdeasFilter filter={filter} onChange={onChangeFilter}/>
    <IdeasList ideas={ideas}/>
  </div>
);

const mapStateToProps = (state) => ({
  ideas: visibleIdeas(state.ideas, state.filter),
  filter: state.filter.text
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilter: (event) => {
    console.log("filter changed");
    dispatch(changeFilterText(event.target.value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(IdeasListContainer);
