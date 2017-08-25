import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Translate } from 'react-redux-i18n';

const UsersListItem = withRouter(({user}) => (
  <li className="list-group-item">
    <div className="row">
      <div className="col-xs-12">
        <img className="profile-image small" src={user.image_url} />
        &nbsp; {user.name}
      </div>
    </div>
  </li>
));

const mapDispatchToProps = dispatch => ({ });

UsersListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired
};

export default connect(null, mapDispatchToProps)(UsersListItem);
