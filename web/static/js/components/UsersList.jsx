import UsersListItem from './UsersListItem';
import React from 'react';
import { Translate } from 'react-redux-i18n';

const UsersList = ({users, onChangeUser}) => (
  <div className="row">
    <div className="col-xs-12">
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-xs-7 col-sm-5 col-md-4 col-lg-3">
              <strong><Translate value="users.users" /></strong>
            </div>
            <div className="col-xs-5">
              <strong><Translate value="users.is_admin" /></strong>
            </div>
          </div>
        </li>
        { users.map((user) => (<UsersListItem key={user.id} user={user} onChangeUser={onChangeUser(user)}/>)) }
      </ul>
    </div>
  </div>
);

export default UsersList;
