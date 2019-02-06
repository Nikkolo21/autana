import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth, base } from '../../base';
import * as routes from '../../constants/routes';
import './Auth.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isFetching } from '../../actions/auth/registerAction';
import { emailVerified } from '../../actions';
import { redirect } from '../../actions/redirect';
//const Recaptcha = require('react-recaptcha');

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _register = (event) => {
    const { _emailVerified, _isFetching, _redirect } = this.props;
    const { email, password } = this.state;
    event.preventDefault();

    if (this._validForm()) {
      _isFetching(true);
      auth.createUserWithEmailAndPassword(email, password).then(user => {
        this.ref = base.post(`users/${user.user.uid}/profileData`, {
          data: { choosecUserType: false } //N = nomad, E = employer, A = admin
        }).then(err => {
          if (!err) {
            auth.onAuthStateChanged((user) => {
              _emailVerified(false); _isFetching(false); _redirect("/lets_go");
              user && user.sendEmailVerification();
            })
          }
        })
      }).catch((e) => {
        _isFetching(false);
        console.log(e.message);
      });
    }
  }

  //auth.sendPasswordResetEmail(email, {})
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
    let button = this._validForm() && !this.props.loading ?
      "enabledR " : "disabledR ";
    return (
      <div className="container my-5 authContainer">
        <form className="card basic-form mx-2" onSubmit={this._register}>
          <div className="text-right pt-3 pr-3 pt-md-5 pr-md-5">
            <Link to='/home'> Go back</Link>
          </div>
          <div className="text-center text-white card-header bg-addProject pt-2">
            <img style={{ "height": "180px", "width": "180px" }} src={`/imgs/mountain.png`} alt="login" />
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
    _isFetching: isFetching,
    _emailVerified: emailVerified,
    _redirect: redirect
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(Register);