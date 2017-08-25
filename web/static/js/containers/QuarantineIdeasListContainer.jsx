import React, { PropTypes } from 'react';
import QuarantineIdeasListItem from '../components/QuarantineIdeasListItem';
import { connect } from 'react-redux';

import IdeasList from '../components/IdeasList';

const QuarantineIdeasListContainer = ({ideas}) => (
  <IdeasList ideas={ideas.map((idea) => (<QuarantineIdeasListItem key={idea.id} idea={idea} />))} />
);

const mapStateToProps = (state) => ({
  ideas: state.ideas.filter((i) => (i.status === 'under_review'))
});

export default connect(mapStateToProps)(QuarantineIdeasListContainer);
