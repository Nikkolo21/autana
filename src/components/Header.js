import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import * as routes from '../constants/routes';
import './header.css';
import { auth } from '../base';
import Modal from './util/Modal';
import AddAtom from './atom/AddAtom';
const wc = require('which-country'); //Geo reverse country

export default class Header extends Component {
  constructor () {
    super();
    this.state = {
      modalIsOpen: false
    }
  } 
  showPosition = (position) => {
    console.log(wc([position.coords.longitude, position.coords.latitude]));
  } //Geolocalization
  
  getLocation = () => {
    navigator.geolocation ? navigator.geolocation.getCurrentPosition(this.showPosition) : console.log("Geolocation is not supported by this browser.");
  }
  
  signOut = () => {
    auth.signOut().then(() => {
      console.log("getOut");
    });
  }
  
  openModal = () => {
    this.setState({modalIsOpen: true});
  }
  
  closeModal = () => {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    let {modalIsOpen} = this.state;
    return (
      <div className="bg-white mb-3 py-4 px-xs-2 px-sm-5">
        <div className="d-flex justify-content-between">
          <NavLink to={routes.HOME} className="navbar-brand myLogo align-self-center"></NavLink>
          { this.props.loggedIn ?
            ( this.props.loggedIn.logged ?
              ( <div className="d-flex pt-3">
                  <button className="btn btn-sm btn-info align-self-center mb-2 mr-2" onClick={this.openModal} style={{backgroundColor: "#4183FF"}}>Create Atom</button>
                  <NavLink activeClassName="navbarActive" to={routes.PROJECTS} className="nav-link">Projects</NavLink>
                  <NavLink activeClassName="navbarActive" to={routes.ATOMS} className="nav-link">Atoms</NavLink>
                  <NavLink activeClassName="navbarActive" to={routes.PROFILE} className="nav-link">Profile</NavLink>
                  <a style={{"cursor": "pointer"}} className="nav-link signOut" onClick={this.signOut}>Logout</a>
                </div>):
              ( <div className="d-flex">
                  <NavLink activeClassName="navbarActive" to={routes.LOGIN} className="mt-3 nav-link">Login</NavLink>
                </div>)
            ):
            ("")
          }
          </div>
          {
            modalIsOpen ? 
              (<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                <AddAtom uid={this.props.uid} closeModal={this.closeModal}/>
              </Modal>) : ("")
          }
      </div>
    )
  }
};
