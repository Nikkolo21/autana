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
import {addClientUID} from './actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from './constants/routes';

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      this.setState({responseLogin: user ? {logged: true} : {logged: false}})
      user && this.props._addClientUID(user.uid);
    })
  }

  redirectOrNot = (conditional, component, redirectPath) => {
    return conditional ? 
      (component):(<Redirect to={redirectPath}/>)
  }
  
  render() {
    const RESP_LOGGED = this.state.responseLogin;
    const { uid } = this.props;
    return (
      <Switch>
        <div>
          <Header uid={uid} loggedIn={this.state.responseLogin}/>
          <Route exact path={routes.HOME} component={PublicHomePage}/>
          <Route exact path={routes.LOGIN} render={() => (
            this.redirectOrNot(RESP_LOGGED && !this.state.responseLogin.logged, <Login/>, '/home')
          )}/>
          <Route exact path={routes.REGISTER} render={() => (
            this.redirectOrNot(RESP_LOGGED && !this.state.responseLogin.logged, <Register/>, '/home')
          )}/>

          <Route exact path={routes.PROJECTS} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <Projects/>, '/home')
          )}/>
          <Route exact path={routes.ATOMS} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <Atoms uid={uid}/>, '/home')
          )}/>
          <Route exact path={routes.SHOW_PROJECT} render={(props) => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <ShowProject {...props} {...this.props}/>, '/home')
          )}/>

          <Route exact path={routes.ADD_PROJECT} render={() => (
            this.redirectOrNot(RESP_LOGGED && this.state.responseLogin.logged, <AddProject/>, '/home') 
          )}/>
        </div>
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    uid: state.client.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    _addClientUID: (uid) => {
      dispatch(addClientUID(uid))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);