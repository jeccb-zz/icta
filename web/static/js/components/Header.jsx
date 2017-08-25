import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n';

const Header = ({userName, userImage}) => (
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <Link className="navbar-brand" to="/"></Link>
        <div className="pull-right">
          <img className="profile-image visible-xs" src={userImage} />
        </div>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><Link to="/"><Translate value="header.list" /></Link></li>
          <li><Link to="/quarantine"><Translate value="header.quarantine" /></Link></li>
          <li><Link to="/ideas/new"><Translate value="header.new" /></Link></li>
        </ul>
        <ul className="nav navbar-nav navbar-right hidden-xs">
          <li>
            <p className="navbar-text"><Translate value="header.welcome" name={userName}/></p>
            <img className="profile-image" src={userImage} />
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userImage: state.user.image_url,
})

export default connect(mapStateToProps)(Header);
