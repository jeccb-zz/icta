import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n';

const Header = ({userName, userImage}) => (
  <nav className="navbar navbar-inverse" role="navigation">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#header-collapse"
          aria-expanded="false"
          aria-controls="header-collapse">
          <i className="fa fa-bars fa-2x"></i>
        </button>
        <Link className="navbar-brand" to="/"></Link>

        <img className="profileImage" src={userImage} />
      </div>

      <div className="collapse navbar-collapse navbar-left" id="header-collapse">
        <ul className="nav navbar-nav">
          <li><Link to="/"><Translate value="header.list" /></Link></li>
          <li><Link to="/ideas/new"><Translate value="header.new" /></Link></li>
        </ul>
      </div>

      <div className="pull-right hidden-xs">
        <p className="navbar-text"><Translate value="header.welcome" name={userName}/></p>
        <img className="profileImage" src={userImage} />
      </div>
    </div>
  </nav>
)

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userImage: state.user.image_url,
})

export default connect(mapStateToProps)(Header);
