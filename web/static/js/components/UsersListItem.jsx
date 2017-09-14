import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Toggle from 'react-toggle';


const UsersListItem = withRouter(({ user, onChangeUser }) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-xs-8 col-sm-5 col-md-4 col-lg-3">
        <img className="profile-image small" src={user.image_url} alt="profile" />
        &nbsp; {user.name}
      </div>
      <div className="col-xs-4">
        <Toggle
          checked={user.kind === 'admin'}
          onChange={onChangeUser}
          value="yes"
        />
      </div>
    </div>
  </li>
));

UsersListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onChangeUser: PropTypes.func.isRequired,
};

export default UsersListItem;
