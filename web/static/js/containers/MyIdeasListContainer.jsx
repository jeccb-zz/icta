import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IdeasList from '../components/IdeasList';
import IdeasListItem from '../components/IdeasListItem';

const MyIdeasListContainer = ({ ideas }) => (
  <div>
    <IdeasList ideas={ideas.map(idea => (<IdeasListItem key={idea.id} idea={idea} />))} />
  </div>
);

MyIdeasListContainer.propTypes = {
  ideas: PropTypes.arrayOf(PropTypes.shape({
    author: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  })),
};

MyIdeasListContainer.defaultProps = {
  ideas: null,
};

const mapStateToProps = state => ({
  ideas: state.ideas.filter(i => (i.author.id === state.user.id)),
});

export default connect(mapStateToProps)(MyIdeasListContainer);
