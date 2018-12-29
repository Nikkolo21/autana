import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './base';
import Projects from './components/project/Projects';
import Atoms from './components/atom/Atoms';
import ShowProject from './components/project/ShowProject';
import AddProject from './components/project/AddProject';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PublicHomePage from './components/PublicHomePage';
import { addClientUID, isFetching } from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from './constants/routes';
import { bindActionCreators } from 'redux';

class App extends Component {
  componentDidMount() {
    this.props.isFetching(true);
    auth.onAuthStateChanged((user) => {
      this.props.isFetching(false);
      user && this.props._addClientUID(user.uid);
    })
  }

  redirectOrNot = (conditional, component, redirectPath) => {
    return conditional ?
      (component) : (<Redirect to={redirectPath} />)
  }

  render() {
    const RESP_LOGGED = this.props.isAuth;
    return (
      <Switch>
        <div>
          <Header />
          <Route exact path={routes.HOME} component={PublicHomePage} />
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.REGISTER} component={Register} />
          <Route exact path={routes.ATOMS} component={Atoms} />
          <Route exact path={routes.SHOW_PROJECT} component={ShowProject} />
          <Route exact path={routes.ADD_PROJECT} component={AddProject} />

          <Route exact path={routes.PROJECTS} render={() => (
            this.redirectOrNot(RESP_LOGGED, <Projects />, '/home')
          )} />
        </div>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.auth.uid,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _addClientUID: addClientUID,
    isFetching
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App);