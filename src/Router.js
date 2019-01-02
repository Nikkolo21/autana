import React, { Component } from 'react';
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

import { addClientUID, isFetching, emailVerified, choosedUserType } from './actions';
import { redirect } from './actions/redirect';

import 'bootstrap/dist/css/bootstrap.min.css';

class Routes extends Component {
  componentWillMount() {
    const { _isFetching, _emailVerified, _addClientUID, _redirect, _choosedUserType } = this.props;
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
  }

  render() {
    const { isAuth, children, choosedUserType, userType } = this.props;
    return (
      <Router>
        <div>
          {children}
          <Header />
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
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  choosedUserType: state.auth.choosedUserType,
  emailVerified: state.auth.emailVerified,
  isAuth: state.auth.isAuth,
  isFetching: state.auth.isFetching,
  uid: state.auth.uid,
  userType: state.auth.userType
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _addClientUID: addClientUID,
    _emailVerified: emailVerified,
    _isFetching: isFetching,
    _redirect: redirect,
    _choosedUserType: choosedUserType
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Routes);