import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import './header.css';
import { auth } from '../base';
const wc = require('which-country'); //Geo reverse country

let showPosition = (position) => {
  console.log(wc([position.coords.longitude, position.coords.latitude]));
}

let getLocation = () => {
  navigator.geolocation ? navigator.geolocation.getCurrentPosition(showPosition) : console.log("Geolocation is not supported by this browser.");
}

let signOut = () => {
  auth.signOut().then(() => {
    console.log("getOut");
  });
}

getLocation();

const Header = props => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-white mb-3 py-4 px-xs-2 px-sm-5">
      <NavLink to={routes.HOME} className="navbar-brand myLogo">{props.branding}</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon myToggle"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
          { props.loggedIn ? 
          (<ul className="navbar-nav ml-auto myHeaderNav">
            <li className="nav-item">
              <NavLink to={routes.GROUPS} className="nav-link">My groups</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={routes.PROFILE} className="nav-link">Profile</NavLink>
            </li>
            <li className="nav-item">
              <a style={{"cursor": "pointer"}} className="nav-link signOut" onClick={signOut}>SignOut</a>
            </li>
          </ul>):
          (
          <ul className="navbar-nav ml-auto myHeaderNav">
            <li className="nav-item">
              <NavLink to={routes.LOGIN} className="nav-link">Login</NavLink>
            </li>
          </ul>
          )}
        
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
