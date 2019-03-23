import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../base';

import * as routes from '../constants/routes';

import { openAndCloseModal } from '../actions'
import './header.css';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/auth/loginAction';
import { _getLocation } from '../helpers/geo';
import { redirect } from '../actions/redirect';

class Header extends Component {
  _signOut = () => {
    auth.signOut().then(() => {
      this.props._logout();
      this.props._redirect(routes.HOME);
    });
  }

  componentWillMount() {
    _getLocation();
  }

  render() {
    let { choosedUserType, isFetching, loggedIn, _openModal, userType } = this.props;
    return (
      <div className="header bg-white py-4 px-xs-2 px-sm-5">
        <div className="d-flex justify-content-between">
          <NavLink to={routes.HOME} className="navbar-brand myLogo align-self-center"></NavLink>
          {
            !isFetching &&
            (loggedIn ? (
              <div className="d-flex pt-3">
                {
                  choosedUserType &&
                  (<Fragment>
                    {
                      userType === "hunter" &&
                      <Fragment>
                        <button className="btn btn-sm btn-default align-self-center mb-2 mr-2 btn-cta" onClick={_openModal}>Create Atom</button>
                        <NavLink activeClassName="navbarActive" to={routes.PROJECTS} className="nav-link">Projects</NavLink>
                      </Fragment>
                    }
                    <NavLink activeClassName="navbarActive" to={routes.PROFILE} className="nav-link">Profile</NavLink>
                  </Fragment>)
                }
                <a style={{ "cursor": "pointer" }} className="nav-link signOut" onClick={this._signOut}>Logout</a>
              </div>) :
              (<div className="d-flex">
                <NavLink activeClassName="navbarActive" to={routes.LOGIN} className="mt-3 nav-link">Login</NavLink>
              </div>)
            )
          }
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => ({
  choosedUserType: state.auth.choosedUserType,
  isFetching: state.client.isFetching,
  loggedIn: state.auth.isAuth,
  userType: state.auth.userType
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _openModal: openAndCloseModal,
    _logout: logout,
    _redirect: redirect
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Header);