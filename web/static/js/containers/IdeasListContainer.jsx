import React, { Component, PropTypes } from 'react';
import { fetchIdeas } from '../actions/ideas';
import { connect } from 'react-redux';
import IdeasList from '../components/IdeasList';

class IdeasListContainer extends Component {
  componentDidMount() {
    let { getIdeas } = this.props;
    getIdeas();
  }

  render() {
    return (
      <IdeasList />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  getIdeas: () => {
    dispatch(fetchIdeas());
  },
});

IdeasListContainer.propTypes = {
  getIdeas: React.PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(IdeasListContainer);
