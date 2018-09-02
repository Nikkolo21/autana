import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import './header.css';

const Header = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-4">
      <div className="container">
        <a href="/" className="navbar-brand">{props.branding}</a>
        <div>
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
