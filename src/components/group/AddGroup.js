import React, { Component } from 'react';
import { base } from '../../base';
import { Redirect, Link } from 'react-router-dom';
import './Group.css';
import SearchCountry from '../SearchCountry';
const uuidv4 = require('uuid/v4'); //random ID

export default class AddGroup extends Component {
  constructor () {
    super();
    this.state = {
      toGroups: false,
      buttonClass: 'disabled',
      selectedCountries: []
    }
  }
  
  //this.ref = base.push(`groups/27c4b916-f568-46a6-8247-9cd819e0c43b`, {}
  
  componentDidMount () {
    /*auth.signInWithEmailAndPassword("nikko1801@gmail.com", "nikkolo682").then(user => {
      this.setState({userId: user.user.uid})
    }).catch(e => {
      console.log(e);
    });*/
  }

  addGroup = () => {
    if (this.validForm()) {
      const workspaceId = uuidv4();
      const {title, description, users, selectedCountries} = this.state;
      this.ref = base.post(`workspace/${workspaceId}`, {
        data: {title: title, description: description, users: users, countries: selectedCountries}
      }).then(err => {
        if(!err){
          
          this.ref = base.post(`${this.props.uid}/workspaces/${workspaceId}`, {
            data: {title: title, description: description, users: users, countries: selectedCountries}
          }).then(err => {
            if (!err) {
              this.setState({toGroups: true});
            }
          })

        }
        base.removeBinding(this.ref);
      });
    }
  }
  
  handleEvent = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  getSelectedCountries = (countries) => {
    this.setState({selectedCountries: countries});
  }
  
  validForm = () => {
    const {title, description, users, selectedCountries} = this.state;
    return title && description && users && selectedCountries[0]; 
  }
  
  render() {
    const searchCountry = <SearchCountry method={this.getSelectedCountries} searchLabel="Where are you looking for your nomads?"/>
    let button = this.validForm() ? "enabled ": "disabled ";
    
    if (this.state.toGroups) {
      return <Redirect to='/groups' />
    }
    return (
      <div className="container mt-5">
        <div className="card basic-form mx-2">
          <div className="text-right pt-5 pr-5">
            <Link to='/groups'> Go back</Link>
          </div>
          <div className="text-center text-white card-header bg-addGroup py-2">
            <h4 className="title">Create a Nomad Workplace</h4>
          </div>
          <div className="card-body py-5 px-md-5">
            <div className="px-md-5">
              <div className="form-group">
                  <label>Title</label>
                  <input type="text" className="my-form-control p-4" name="title" id="title" onChange={this.handleEvent}/>
              </div>
              <div className="form-group">
                  <label>Description</label>
                  <input type="text" className="my-form-control p-4" name="description" id="description" onChange={this.handleEvent}/>
              </div>
              <div className="form-group">
                  <label>Clients</label>
                  <input type="text" className="my-form-control p-4" name="users" id="users" onChange={this.handleEvent}/>
              </div>
              {searchCountry}
            </div>
            <div className="text-center">
              <button type="submit" className={`${button} btn btn-light btn-lg px-4`}
                onClick={this.addGroup}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}