import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Translate } from 'react-redux-i18n';

const Header = ({userName, userImage}) => (
  <nav className="navbar navbar-inverse  navbar-static-top" role="navigation">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/"></Link>
      </div>

      <ul className="nav navbar-nav">

        <li><Link to="/"><Translate value="header.list" /></Link></li>
        <li><Link to="/ideas/new"><Translate value="header.new" /></Link></li>
      </ul>

      <ul className="nav navbar-nav navbar-right">
        <li><p className="navbar-text"><Translate value="header.welcome" name={userName}/></p></li>
        <li><img className="profileImage" src={userImage} /></li>
      </ul>
    </div>
  </nav>
)

const mapStateToProps = (state) => ({
  userName: state.user.name,
  userImage: state.user.image_url,
})

export default connect(mapStateToProps)(Header);
