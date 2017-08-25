import React, { PropTypes, Component } from 'react';
import UsersList from '../components/UsersList';
import { connect } from 'react-redux';
import { changeFilterText } from '../actions/users';
import { getAllUsers } from '../actions/users';

import UsersFilter from '../components/UsersFilter';

const visibleUsers = (users, filter) => (
  filter.text.length > 0 ? users.filter(u => u.name.toUpperCase().indexOf(filter.text.toUpperCase()) !== -1) : users
);

class UsersListContainer extends Component {
  componentWillMount() {
    const { getAllUsers } = this.props;
    getAllUsers();
  }

  render () {
    const {users, filter, onChangeFilterText} = this.props;

    if ( users === 'loading' ) {
      return ( <div>Loading...</div> );
    } else {
      return (
        <div>
          <UsersFilter filter={filter} onChange={onChangeFilterText}/>
          <UsersList users={users}/>
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  users: visibleUsers(state.users, state.userFilter),
  filter: state.userFilter,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeFilterText: (event) => {
    dispatch(changeFilterText(event.target.value));
  },
  getAllUsers: () => {
    dispatch(getAllUsers());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersListContainer);
