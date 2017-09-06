import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuarantineIdeasListItem from '../components/QuarantineIdeasListItem';

import IdeasList from '../components/IdeasList';

const QuarantineIdeasListContainer = ({ ideas }) => (
  <IdeasList ideas={ideas.map(idea => (<QuarantineIdeasListItem key={idea.id} idea={idea} />))} />
);

QuarantineIdeasListContainer.propTypes = {
  ideas: PropTypes.array,
};

QuarantineIdeasListContainer.defaultProps = {
  ideas: null,
};

const mapStateToProps = state => ({
  ideas: state.ideas.filter(i => (i.status === 'under_review')),
});

export default connect(mapStateToProps)(QuarantineIdeasListContainer);
