import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IdeasListContainer from './IdeasListContainer';

const MyIdeasListContainer = ({ ideas }) => (
  <div>
    <IdeasListContainer ideas={ideas} />
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
