import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../base';

import * as routes from '../constants/routes';

import AddAtom from './atom/AddAtom';
import Modal from './util/Modal';

import { openAndCloseModal } from '../actions'
import './header.css';
import { bindActionCreators } from 'redux';
import { logout } from '../actions/auth/loginAction';
import { _getLocation } from '../helpers/geo';

class Header extends Component {
  _signOut = () => {
    auth.signOut().then(() => {
      this.props.logout();
    });
  }

  componentWillMount() {
    _getLocation();
  }

  render() {
    let { modalIsOpen, _openModal } = this.props;
    return (
      <div className="bg-white mb-3 py-4 px-xs-2 px-sm-5">
        <div className="d-flex justify-content-between">
          <NavLink to={routes.HOME} className="navbar-brand myLogo align-self-center"></NavLink>
          {!this.props.isFetching &&
            (this.props.loggedIn ?
              (<div className="d-flex pt-3">
                <button className="btn btn-sm btn-info align-self-center mb-2 mr-2" onClick={_openModal} style={{ backgroundColor: "#4183FF" }}>Create Atom</button>
                <NavLink activeClassName="navbarActive" to={routes.PROJECTS} className="nav-link">Projects</NavLink>
                <NavLink activeClassName="navbarActive" to={routes.ATOMS} className="nav-link">Atoms</NavLink>
                <NavLink activeClassName="navbarActive" to={routes.PROFILE} className="nav-link">Profile</NavLink>
                <a style={{ "cursor": "pointer" }} className="nav-link signOut" onClick={this._signOut}>Logout</a>
              </div>) :
              (<div className="d-flex">
                <NavLink activeClassName="navbarActive" to={routes.LOGIN} className="mt-3 nav-link">Login</NavLink>
              </div>)
            )
          }
        </div>
        {
          modalIsOpen &&
          (<Modal>
            <AddAtom uid={this.props.uid} />
          </Modal>)
        }
      </div>
    )
  }
};

const mapStateToProps = state => ({
  modalIsOpen: state.atoms.modal,
  uuid: state.auth.uuid,
  loggedIn: state.auth.isAuth,
  isFetching: state.client.isFetching
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _openModal: openAndCloseModal,
    logout
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Header);