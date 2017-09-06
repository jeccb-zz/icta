import React from 'react';
import PropTypes from 'prop-types';
import IdeasList from '../components/IdeasList';
import IdeasListItem from '../components/IdeasListItem';

const IdeasListContainer = ({ ideas }) => (
  <IdeasList ideas={ideas.map(idea => (<IdeasListItem key={idea.id} idea={idea} />))} />
);

IdeasListContainer.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
};

IdeasListContainer.defaultProps = {
  ideas: null,
};

export default IdeasListContainer;
