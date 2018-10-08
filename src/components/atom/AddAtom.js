import React, { Component } from 'react';
import './Atom.css';

export default class AddAtom extends Component {
  render() {
    let button = true ? "enabled ": "disabled ";
    return (    
        <div className="addAtomBody">
            <div className="card basic-form">
                <small className="text-right pt-3 pr-3 pt-md-5 pr-md-5">
                    <a style={{color: "red", textDecoration: "none", cursor: "pointer"}} onClick={this.props.closeModal}>Close</a>
                </small>
                <div className="text-center text-white card-header bg-addProject py-2">
                    <h4 className="title">Create Atom</h4>
                </div>
                <div className="card-body py-5 px-md-5 text-left">
                    <div className="px-md-5">
                        <div className="form-group">
                            <label>Name*</label>
                            <input type="text" className="my-form-control p-4" name="name" id="name" onChange={this.handleEvent}/>
                        </div>
                        <div className="form-group">
                            <label>Description*</label>
                            <input type="text" className="my-form-control p-4" name="description" id="description" onChange={this.handleEvent}/>
                        </div>
                        <div className="form-group">
                            <label>Project*</label>
                            <input type="text" className="my-form-control p-4" name="project" id="project" onChange={this.handleEvent}/>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className={`${button} btn btn-light btn-lg px-4`}
                        onClick={this.addProject}>Create</button>
                    </div>
                </div>
            </div>

        </div>
    )
  }
}
