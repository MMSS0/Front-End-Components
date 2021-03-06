import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";
import PropTypes from "prop-types";

class Header extends Component {

  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;

    const userIsAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              Dashboard
                </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link " to="/dashboard">
              {user.fullname}
            </Link>
          </li>
          <li className="nav-item">
            <div className="nav-link" onClick={this.logout.bind(this)}>
              Logout
            </div>
          </li>
        </ul>
      </div>
    );


    const userIsNotAuthenticated = (
      <div className="collapse navbar-collapse" id="mobile-nav">

        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link " to="/register">
              Sign Up
                </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
                </Link>
          </li>
        </ul>
      </div>
    );

    let headerLinks;

    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    }
    else {
      headerLinks = userIsNotAuthenticated;
    }

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary mb-4">
        <div className="container">
          <a className="navbar-brand" href="/">
            Personal Project Management Tool
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {headerLinks}

        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  security: state.security
})

export default connect(mapStateToProps, { logout })(Header);
