import React, { Component } from 'react';
import { BrowserRouter as Switch, Route, Redirect } from 'react-router-dom';
import { auth } from './base';

import Groups from './components/group/Groups';
import AddGroup from './components/group/AddGroup';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PublicHomePage from './components/PublicHomePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as routes from './constants/routes';



export default class App extends Component {
  constructor () {
    super();
    this.state = {
      loggedIn: false
    };
  }
  
  componentDidMount () {
    auth.onAuthStateChanged((user) => {
      this.setState({loggedIn: user ? true : false, uid: user ? user.uid : null})
    })
  }

  redirectOrNot = (conditional, component, redirectPath) => {
    return conditional ? 
    (component):(<Redirect to={redirectPath}/>)
  }
  
  render() {
    return (
      <Switch>
        <div>
          <Header branding="" loggedIn={this.state.loggedIn}/>
          <Route exact path={routes.HOME} component={PublicHomePage}/>
          <Route exact path={routes.LOGIN} render={() => (
            this.redirectOrNot(!this.state.loggedIn, <Login/>, '/home')
          )}/>
          <Route exact path={routes.REGISTER} render={() => (
            this.redirectOrNot(!this.state.loggedIn, <Register/>, '/home')
          )}/>

          <Route exact path={routes.GROUPS} render={() => (
            this.redirectOrNot(this.state.loggedIn, <Groups uid={this.state.uid}/>, '/home')
          )}/>

          <Route exact path={routes.ADD_GROUP} render={() => (
            this.redirectOrNot(this.state.loggedIn, <AddGroup uid={this.state.uid}/>, '/home') 
          )}/>
        </div>
      </Switch>
    )
  }
}
