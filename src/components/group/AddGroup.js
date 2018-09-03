import React, { Component } from 'react';
import { base } from '../../base';
import { Redirect, Link } from 'react-router-dom';
import './Group.css';
import SearchCountry from '../SearchCountry';
const uuidv4 = require('uuid/v4');


export default class AddGroup extends Component {
  constructor () {
    super();
    this.state = {
      toGroups: false,
      buttonClass: 'disabled',
      selectedCountries: []
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.getSelectedCountries = this.getSelectedCountries.bind(this);
  }

  //this.ref = base.push(`groups/27c4b916-f568-46a6-8247-9cd819e0c43b`, {}

  addGroup (){
    const {title, description, users, selectedCountries} = this.state;
    if (title && description && users) {
      this.setState({buttonClass: "enabled"});
      this.ref = base.post(`groups/${uuidv4()}`, {
        data: {title: title, description: description, users: users, countries: selectedCountries}
      }).then(err => {
        if(!err){
          this.setState({toGroups: true});
        }
        base.removeBinding(this.ref);
      });
    }
  }

  handleEvent(e) {
    const {title, description, users, selectedCountries} = this.state;
    this.setState({[e.target.name]: e.target.value});
    (title && description && users && selectedCountries) ? this.setState({buttonClass: "enabled"}) : this.setState({buttonClass: "disabled"});
  }

  getSelectedCountries (countries) {
    this.setState({selectedCountries: countries});
  }

  render() {
    if (this.state.toGroups) {
      return <Redirect to='/groups' />
    }
    const searchCountry = <SearchCountry method={this.getSelectedCountries} searchLabel="Where are you looking for your nomads?"/>
    return (
      <div className="container mt-5">
        <div className="card basic-form mx-2">
          <div className="text-center text-white card-header bg-addGroup py-5">
            <h4>Create a Nomad Workplace</h4>
          </div>
          <div className="card-body py-5 px-5">
            <p className="text-right">
              <Link to='/groups'> Go back to WorkGroup List</Link>
            </p>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="my-form-control py-4 px-4" name="title" id="title" onChange={this.handleEvent}/>
            </div>
            <div className="form-group">
                <label>Description</label>
                <input type="text" className="my-form-control py-4 px-4" name="description" id="description" onChange={this.handleEvent}/>
            </div>
            <div className="form-group">
                <label>Clients</label>
                <input type="text" className="my-form-control py-4 px-4" name="users" id="users" onChange={this.handleEvent}/>
            </div>
            {searchCountry}
            <div className="text-center">
              <button type="submit" className={this.state.buttonClass + " btn btn-light btn-lg px-4"} onClick={this.addGroup}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}