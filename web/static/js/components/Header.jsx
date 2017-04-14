import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const Header = ({userName}) => (
  <nav className="navbar navbar-inverse  navbar-static-top" role="navigation">
    <div className="container-fluid">
      <div className="navbar-header">
        <Link className="navbar-brand" to="/"></Link>
      </div>

      <ul className="nav navbar-nav">
        <li>
          <Link to="/">List</Link>
        </li>
        <li>
          <Link to="/ideas/new">New</Link>
        </li>
      </ul>

      <ul className="nav navbar-nav navbar-right">
        <li><p className="navbar-text">Welcome {userName}</p></li>
      </ul>
    </div>
  </nav>
)

const mapStateToProps = (state) => ({
  userName: state.user.name,
})

export default connect(mapStateToProps)(Header);