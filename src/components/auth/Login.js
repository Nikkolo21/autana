import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { auth } from '../../base';
import * as routes from '../../constants/routes';
import { connect } from 'react-redux';
import { isFetching } from '../../actions/auth/loginAction';
import { bindActionCreators } from 'redux';
import { validateEmail, validatePassword } from '../../helpers';
import './Auth.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    validForm = () => {
        const { email, password } = this.state;
        return validateEmail(email) && validatePassword(password);
    }

    _login = (event) => {
        this.props.isFetching(true);
        event.preventDefault();
        if (this.validForm()) {
            auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(user => {
                this.props.isFetching(false);
            }).catch((error) => {
                console.log(error.message);
                this.props.isFetching(false);
            });
        }
    }

    render() {
        if (this.props.isAuth) {
            return <Redirect to='/home' />
        }
        let button = this.validForm() && !this.props.loading ?
            "enabled " : "disabled ";
        return (
            <div className="container my-5 authContainer">
                <form className="card basic-form mx-2" onSubmit={this._login}>
                    <div className="text-right pt-3 pr-3 pt-md-5 pr-md-5">
                        <Link to='/home'> Go back</Link>
                    </div>
                    <div className="text-center text-white card-header bg-addProject pt-2">
                        <img style={{ "height": "150px", "width": "150px" }} src={`/imgs/bridge.png`} alt="login" />
                    </div>
                    <div className="card-body pb-3 pt-2 px-md-5">
                        <div className="px-md-5">
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" className="my-form-control p-4" name="email" id="email" onChange={this.handleEvent} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="my-form-control p-4" name="password" id="password" onChange={this.handleEvent} />
                            </div>
                        </div>
                        <div className="text-center">
                            <button style={{ backgroundColor: "#6b3faf" }}
                                type="submit" className={`${button} btn btn-login btn-light btn-lg px-4`}>
                                Login
                            </button>
                            <p className="mt-4"> Do not you have an account? <Link to={routes.REGISTER}>Register</Link> </p>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.auth.isFetching,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        isFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Login);