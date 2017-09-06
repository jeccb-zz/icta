import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UsersList from '../components/UsersList';
import { changeFilterText, getAllUsers, setUserKind } from '../actions/users';

import UsersFilter from '../components/UsersFilter';

const visibleUsers = (users, filter) => {
  if (filter.text.length > 0) {
    return users.filter(u => u.name.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1);
  }

  return users;
};

class UsersListContainer extends Component {
  componentWillMount() {
    const { getUserList } = this.props;
    getUserList();
  }

  render() {
    const { users, filter, onChangeFilterText, onChangeUser } = this.props;

    if (users === 'loading') {
      return (<div>Loading...</div>);
    }

    return (
      <div>
        <UsersFilter filter={filter} onChange={onChangeFilterText} />
        <UsersList users={users} onChangeUser={onChangeUser} />
      </div>
    );
  }
}

UsersListContainer.propTypes = {
  users: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })),
  ]).isRequired,
  filter: PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired,
  onChangeFilterText: PropTypes.func.isRequired,
  onChangeUser: PropTypes.func.isRequired,
  getUserList: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: visibleUsers(state.users, state.userFilter),
  filter: state.userFilter,
});

const mapDispatchToProps = dispatch => ({
  onChangeFilterText: (event) => {
    dispatch(changeFilterText(event.target.value));
  },
  onChangeUser: user => (event) => {
    dispatch(setUserKind(user, event.target.checked ? 'admin' : 'user'));
  },
  getUserList: () => {
    dispatch(getAllUsers());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
