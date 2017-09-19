import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuarantineIdeasListItem from '../components/QuarantineIdeasListItem';

import IdeasList from '../components/IdeasList';
import IdeasFilter from '../components/IdeasFilter';
import { changeQuarantineFilterStatus, changeQuarantineFilterText } from '../actions/ideas';

const visibleIdeas = (ideas, filter) => {
  let filteredIdeas = [...ideas].filter(i => (i.status === 'under_review' || i.status === 'denied'));
  if (filter.text.length > 0) {
    filteredIdeas = filteredIdeas
      .filter(i => i.title.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1);
  }

  return filteredIdeas.filter(i => filter.status.includes(i.status));
};

const QuarantineIdeasListContainer = ({ ideas, filter, onChangeFilterText, onChangeFilterStatus }) => ( // eslint-disable-line max-len
  <div>
    <IdeasFilter
      filter={filter}
      onChange={onChangeFilterText}
      onClickStatus={onChangeFilterStatus}
      statuses={['under_review', 'denied']}
    />
    <IdeasList ideas={ideas.map(idea => (<QuarantineIdeasListItem key={idea.id} idea={idea} />))} />
  </div>
);

QuarantineIdeasListContainer.propTypes = {
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

QuarantineIdeasListContainer.defaultProps = {
  ideas: null,
};

const mapStateToProps = state => ({
  ideas: visibleIdeas(state.ideas, state.quarantineIdeaFilter),
  filter: state.quarantineIdeaFilter,
});

const mapDispatchToProps = dispatch => ({
  onChangeFilterText: (event) => {
    dispatch(changeQuarantineFilterText(event.target.value));
  },
  onChangeFilterStatus: status => () => {
    dispatch(changeQuarantineFilterStatus(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(QuarantineIdeasListContainer);
