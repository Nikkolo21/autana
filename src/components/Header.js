import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import './header.css';

const Header = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-4">
      <a href="/" className="navbar-brand">{props.branding}</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.HOME} className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.GROUPS} className="nav-link">Groups</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.SIGN_IN} className="nav-link">SignIn</NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" to={routes.SIGN_UP} className="nav-link">SignUp</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
};

Header.defaultProps = {
  branding: "no-mad"
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
}

export default Header;
