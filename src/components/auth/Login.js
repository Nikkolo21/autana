import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../base';
import * as routes from '../../constants/routes';
import './Auth.css';

export default class Login extends Component {
    constructor () {
      super();
      this.state = {
          toHome: false,
      }
    }

    handleEvent = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    login = (evn) => {
        evn.preventDefault();
        const { email, password } = this.state;
        if (email && password) {
            auth.signInWithEmailAndPassword(email, password).then(user => {
                this.setState({toHome: true});
            }).catch((e)=> {
                console.log(e.message);
            });
        }
    }

    render() {
        const  { toHome, email, password } = this.state;
        if (toHome) {
            return <Redirect to='/home'/>
        }
        let button = email && password ? "enabled ": "disabled ";
        return (
            <div className="container my-5 authContainer">
                <form className="card basic-form mx-2" onSubmit={this.login}>
                    <div className="text-right pt-5 pr-5">
                        <Link to='/home'> Go back</Link>
                    </div>
                    <div className="text-center text-white card-header bg-addProject pt-2">
                        <img style={{"height":"150px", "width":"150px"}} src={`/imgs/bridge.png`} alt="login"/>
                    </div>
                    <div className="card-body pb-3 pt-2 px-md-5">
                        <div className="px-md-5">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text" className="my-form-control p-4" name="email" id="email" onChange={this.handleEvent}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="my-form-control p-4" name="password" id="password" onChange={this.handleEvent}/>
                        </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className={`${button} btn btn-light btn-lg px-4`}>Login
                            </button>
                            <p className="mt-4"> Do not you have an account? <Link to={routes.REGISTER}>Register</Link> </p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
