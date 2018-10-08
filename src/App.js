import React, { Component } from 'react';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from './constants/routes';

export default class App extends Component {
  constructor () {
    super();
    this.state = {};
  }
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      this.setState({responseLogin: user ? {logged: true} : {logged: false}, uid: user ? user.uid : null})
    })
  }

  redirectOrNot = (conditional, component, redirectPath) => {
    return conditional ? 
      (component):(<Redirect to={redirectPath}/>)
  }
  
  render() {
    const RESP_LOGGED = this.state.responseLogin;
    return (
      <Switch>
        <div>
          <Header branding="" loggedIn={this.state.responseLogin}/>
          <Route exact path={routes.HOME} component={PublicHomePage}/>
          <Route exact path={routes.LOGIN} render={() => (
            this.redirectOrNot(RESP_LOGGED && !this.state.responseLogin.logged, <Login/>, '/home')
          )}/>
          <Route exact path={routes.REGISTER} render={() => (
            this.redirectOrNot(RESP_LOGGED && !this.state.responseLogin.logged, <Register/>, '/home')
          )}/>

          <Route exact path={routes.PROJECTS} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <Projects uid={this.state.uid}/>, '/home')
          )}/>
          <Route exact path={routes.ATOMS} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <Atoms uid={this.state.uid}/>, '/home')
          )}/>
          <Route exact path={routes.SHOW_PROJECT} render={(props) => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <ShowProject {...props} {...this.props} uid={this.state.uid}/>, '/home')
          )}/>

          <Route exact path={routes.ADD_PROJECT} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <AddProject uid={this.state.uid}/>, '/home') 
          )}/>
        </div>
      </Switch>
    )
  }
}
