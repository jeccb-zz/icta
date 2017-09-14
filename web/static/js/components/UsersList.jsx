import React from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import UsersListItem from './UsersListItem';

const UsersList = ({ users, onChangeUser }) => (
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
        { users.map(user => (<UsersListItem
          key={user.id}
          user={user}
          onChangeUser={onChangeUser(user)}
        />)) }
      </ul>
    </div>
  </div>
);

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
  onChangeUser: PropTypes.func.isRequired,
};

export default UsersList;
