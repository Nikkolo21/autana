import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { auth, base } from '../../base';
import * as routes from '../../constants/routes';
import './Auth.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isFetching } from '../../actions/auth/registerAction';
//const Recaptcha = require('react-recaptcha');

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toHome: false
    }
  }
  _register = (event) => {
    event.preventDefault();
    if (this._validForm()) {
      this.props._isFetching(true);
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password).then(user => {
        this.ref = base.post(`users/${user.user.uid}/profileData`, {
          data: { chooseUserType: false } //N = nomad, E = employer, A = admin
        }).then(err => {
          this.props._isFetching(false);
          if (!err) {
            this.setState({ toHome: true });
          }
        })
      }).catch((e) => {
        this.props._isFetching(false);
        console.log(e.message);
      });
    }
  }

  //auth.sendPasswordResetEmail
  //auth.updateCurrentUser
  //auth.useDeviceLanguage
  //auth.

  _handleEvent = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _validForm = () => {
    const { email, password } = this.state;
    return email && password;
  }

  _captchaCallback = () => {
    this.setState({ captcha: true });
  }

  render() {
    if (this.state.toHome) {
      return <Redirect to='/home' />
    }
    let button = this._validForm() && !this.props.loading ?
      "enabledR " : "disabledR ";
    return (
      <div className="container my-5 authContainer">
        <form className="card basic-form mx-2" onSubmit={this._register}>
          <div className="text-right pt-5 pr-5">
            <Link to='/home'> Go back</Link>
          </div>
          <div className="text-center text-white card-header bg-addProject pt-2">
            <img style={{ "height": "150px", "width": "150px" }} src={`/imgs/cape.png`} alt="login" />
          </div>
          <div className="card-body pb-3 pt-2 px-md-5">
            <div className="px-md-5">
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="my-form-control p-4" name="email" id="email" onChange={this._handleEvent} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="my-form-control p-4" name="password" id="password" onChange={this._handleEvent} />
              </div>
              {
                //<Recaptcha className="myRecaptcha mb-2" sitekey="6LfouXEUAAAAAEGP9uIF3I56IZHqZmuly2pQRoMX" verifyCallback={this._captchaCallback} />
              }
            </div>
            <div className="text-center">
              <button type="submit" className={`${button} btn btn-light btn-lg px-4`}>
                Register
              </button>
              <p className="mt-4"> Do you already have an account? <Link to={routes.LOGIN}>Login</Link> </p>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.auth.isFetching
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _isFetching: isFetching
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Register);