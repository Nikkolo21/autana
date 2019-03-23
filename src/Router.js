import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { auth, base } from './base';
import * as routes from './constants/routes';

import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PublicHomePage from './components/PublicHomePage';
import LetsGo from './components/LetsGo';
import HunterRoutes from './components/router/HunterRoutes';
import NomadRoutes from './components/router/NomadRoutes';

import { addClientUID, isFetching, emailVerified, choosedUserType, setIsMobile } from './actions';
import { redirect } from './actions/redirect';

import 'bootstrap/dist/css/bootstrap.min.css';
import AsideButtons from './components/aside/AsideButtons';
import AddAtom from './components/atom/AddAtom';
import Modal from './components/util/Modal';
import AsideMenu from './components/aside/AsideMenu';
import ListAtoms from './components/atom/ListAtoms';
import { check } from './utils/chekMobile';

class Routes extends Component {
  componentDidMount() {
    const { _isFetching, _emailVerified, _addClientUID, _redirect, _choosedUserType, _setIsMobile } = this.props;
    _isFetching(true);
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        _emailVerified(user.emailVerified);
        _addClientUID(user.uid);
        this.projectsRef = base.listenTo(`users/${user.uid}/profileData`, { //enpoint to know if choosed the userType
          context: this,
          asArray: false,
          then(data) {
            _choosedUserType(data);
            !data.choosedUserType && _redirect(routes.LETS_GO);
            _isFetching(false);
          }
        });
      }
      else {
        _redirect(routes.HOME);
        _isFetching(false);
        _redirect(false);
      }
    })
    _setIsMobile(check());
  }

  render() {
    const { isAuth, children, choosedUserType, userType, asideButton, asideIsOpen, modalIsOpen, project_id } = this.props;
    return (
      <Router>
        <Fragment>
          {children}
          <Header />
          <div className="container-fluid" style={{ paddingTop: "110px" }}>
            <Route exact path={routes.HOME} component={PublicHomePage} />
            <Route exact path={routes.LOGIN} component={Login} />
            <Route exact path={routes.REGISTER} component={Register} />
            {
              !choosedUserType &&
              <Route exact path={routes.LETS_GO} component={LetsGo} />
            }
            {
              isAuth && choosedUserType && (
                userType === "hunter" ? <HunterRoutes /> :
                  <NomadRoutes />
              )
            }
          </div>
          {
            asideButton && asideButton.show && (<AsideButtons />)
          }
          {
            asideIsOpen && (<AsideMenu> <ListAtoms project_id={project_id} /> </AsideMenu>)
          }
          {
            modalIsOpen && (<Modal> <AddAtom /> </Modal>)
          }
        </Fragment>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  asideButton: state.app.aside_buttons,
  asideIsOpen: state.app.aside,
  project_id: state.projects.id,
  choosedUserType: state.auth.choosedUserType,
  emailVerified: state.auth.emailVerified,
  isAuth: state.auth.isAuth,
  isFetching: state.auth.isFetching,
  modalIsOpen: state.app.modal,
  uid: state.auth.uid,
  userType: state.auth.userType
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _addClientUID: addClientUID,
    _choosedUserType: choosedUserType,
    _emailVerified: emailVerified,
    _isFetching: isFetching,
    _redirect: redirect,
    _setIsMobile: setIsMobile,
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Routes);