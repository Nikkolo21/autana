import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Switch } from 'react-router-dom';
import { auth, base } from './base';
import Projects from './components/project/Projects';
import Atoms from './components/atom/Atoms';
import ShowProject from './components/project/ShowProject';
import AddProject from './components/project/AddProject';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PublicHomePage from './components/PublicHomePage';
import Board from './components/user/Board';
import LetsGo from './components/LetsGo';
import { addClientUID, isFetching, emailVerified, choosedUserType } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from './constants/routes';
import { bindActionCreators } from 'redux';
import { redirect } from './actions/redirect';

class Router extends Component {
  componentWillMount() {
    const { _isFetching, _emailVerified, _addClientUID, _redirect, _choosedUserType } = this.props;
    _isFetching(true);
    auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        _emailVerified(user.emailVerified);
        _addClientUID(user.uid);
        this.projectsRef = base.listenTo(`users/${user.uid}/profileData/chooseUserType`, { //enpoint to know if choosed the userType
          context: this,
          asArray: false,
          then(choosed) {
            _choosedUserType(choosed);
            choosed ? _redirect(routes.BOARD) : _redirect(routes.LETS_GO);
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
  }

  render() {
    const { children } = this.props;
    return (
      <Switch>
        <Fragment>
          <Header />
          <Route exact path={routes.HOME} component={PublicHomePage} />
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.REGISTER} component={Register} />

          <Route exact path={routes.LETS_GO} component={LetsGo} />
          {
            this.props.isAuth &&
            <Fragment>
              <Route exact path={routes.BOARD} component={Board} />
              <Route exact path={routes.PROJECTS} component={Projects} />
              <Route exact path={routes.ADD_PROJECT} component={AddProject} />
              <Route exact path={routes.SHOW_PROJECT} component={ShowProject} />
              <Route exact path={routes.ATOMS} component={Atoms} />
            </Fragment>
          }
          {children}
        </Fragment>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isAuth: state.auth.isAuth,
    emailVerified: state.auth.emailVerified,
    isFetching: state.auth.isFetching,
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _addClientUID: addClientUID,
    _emailVerified: emailVerified,
    _isFetching: isFetching,
    _redirect: redirect,
    _choosedUserType: choosedUserType
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Router);