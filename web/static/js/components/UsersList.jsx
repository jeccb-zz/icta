import UsersListItem from './UsersListItem';
import React from 'react';

const UsersList = ({users}) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        { users.map((user) => (<UsersListItem key={user.id} user={user} />)) }
      </ul>
    </div>
  </div>
);

export default UsersList;
