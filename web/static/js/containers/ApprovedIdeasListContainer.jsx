import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import IdeasList from '../components/IdeasList';
import IdeasListItem from '../components/IdeasListItem';
import IdeasFilter from '../components/IdeasFilter';
import { changeFilterStatus, changeFilterText } from '../actions/ideas';

const visibleIdeas = (ideas, filter) => {
  let filteredIdeas = [...ideas];
  if (filter.text.length > 0) {
    filteredIdeas = filteredIdeas
      .filter(i => i.title.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1);
  }

  return filteredIdeas.filter(i => filter.status.includes(i.status));
};

const ApprovedIdeasListContainer = ({ ideas, filter, onChangeFilterText, onChangeFilterStatus }) => ( // eslint-disable-line max-len
  <div>
    <IdeasFilter
      filter={filter}
      onChange={onChangeFilterText}
      onClickStatus={onChangeFilterStatus}
      statuses={['new', 'planned', 'in_progress', 'done']}
    />
    <IdeasList ideas={ideas.map(idea => (<IdeasListItem key={idea.id} idea={idea} />))} />
  </div>
);

ApprovedIdeasListContainer.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.shape({
    status: PropTypes.string.isRequired,
  })),
  filter: PropTypes.shape({
    status: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onChangeFilterText: PropTypes.func.isRequired,
  onChangeFilterStatus: PropTypes.func.isRequired,
};

ApprovedIdeasListContainer.defaultProps = {
  ideas: null,
};

const mapStateToProps = state => ({
  ideas: visibleIdeas(state.ideas.filter(i => (i.status !== 'under_review')), state.ideaFilter),
  filter: state.ideaFilter,
});

const mapDispatchToProps = dispatch => ({
  onChangeFilterText: (event) => {
    dispatch(changeFilterText(event.target.value));
  },
  onChangeFilterStatus: status => () => {
    dispatch(changeFilterStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ApprovedIdeasListContainer);
