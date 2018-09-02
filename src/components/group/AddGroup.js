import React, { Component } from 'react';
import { base } from '../../base';
import { Redirect } from 'react-router-dom';
const uuidv4 = require('uuid/v4');


export default class AddGroup extends Component {
  constructor () {
    super();
    this.state = {
      toGroups: false
    }
    this.handleEvent = this.handleEvent.bind(this);
    this.addUser = this.addUser.bind(this);
  }
  
  addUser(){
    const {title, description, users} = this.state;
    this.ref = base.post(`groups/${uuidv4()}`, {
      data: {title: title, description: description, users: users}
    }).then(err => {
      if(!err){
        this.setState({toGroups: true});
      }
      base.removeBinding(this.ref);
    });
  }

  handleEvent(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if (this.state.toGroups) {
      return <Redirect to='/groups' />
    }
    return (
      <div className="container">
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" id="title" onChange={this.handleEvent}/>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input type="text" className="form-control" name="description" id="description" onChange={this.handleEvent}/>
            </div>
            <div className="form-group">
                <label>Clients</label>
                <input type="text" className="form-control" name="users" id="users" onChange={this.handleEvent}/>
            </div>
            <button type="submit" className="btn btn-default" onClick={this.addUser}>Create</button>
      </div>
    )
  }
}