import React, { Component } from 'react';
import { base } from '../../base';
import { Redirect, Link } from 'react-router-dom';
import './Project.css';
import SearchCountry from '../SearchCountry';
const uuidv4 = require('uuid/v4'); //random ID

export default class AddProject extends Component {
  constructor () {
    super();
    this.state = {
      toProjects: false,
      buttonClass: 'disabled',
      selectedCountries: [],
      tagColors: ["#E42B2B", "#b93b51", "#FFA501", "yellow", "#515195", "#4183FF", "#41833F", "#84D284", "black"]
    }
  }

  addProject = () => {
    if (this.validForm()) {
      const PROJECT_ID = uuidv4();
      let {name, tag, description, tagColor, selectedCountries} = this.state;
      this.ref = base.post(`projects/${PROJECT_ID}`, {
        data: {name: name, tag: tag, description: description, tagColor: tagColor, countries: selectedCountries, atomsCount: 0}
      }).then(err => {
        if(!err){
          this.ref = base.post(`users/${this.props.uid}/projects/${PROJECT_ID}`, {
            data: {name: name, tagColor: tagColor}
          }).then(err => {
            if (!err) {
              this.setState({toProjects: true});
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
    let {name, tag, description, tagColor, selectedCountries} = this.state;
    return name && tag && description && tagColor && selectedCountries[0]; 
  }
  
  render() {
    let {tagColor, tagColors} = this.state;
    let searchCountry = <SearchCountry method={this.getSelectedCountries} searchLabel="Where are you looking for nomads?"/>
    let button = this.validForm() ? "enabled ": "disabled ";
    
    if (this.state.toProjects) {
      return <Redirect to='/my_projects' />
    }
    return (
      <div className="container my-5 addProjectContainer" id="theBody">
        <div className="card basic-form mx-2">
          <small className="text-right pt-5 pr-5">
            <Link to='/my_projects' style={{color: "red", textDecoration: "none"}}>Go back</Link>
          </small>
          <div className="text-center text-white card-header bg-addProject py-2">
            <h4 className="title">Create a project</h4>
          </div>
          <div className="card-body py-5 px-md-5">
            <div className="px-md-5">
              <div className="form-group">
                  <label>Name*</label>
                  <input type="text" className="my-form-control p-4" name="name" id="name" onChange={this.handleEvent}/>
              </div>
              <div className="form-group">
                  <label>Tag*</label>
                  <input type="text" className="my-form-control p-4" name="tag" id="tag" onChange={this.handleEvent}/>
              </div>
              <div className="form-group">
                  <label>Description*</label>
                  <input type="text" className="my-form-control p-4" name="description" id="description" onChange={this.handleEvent}/>
              </div>
              <div className="form-group">
                  <label>Tag Color*</label>
                  <div className="row px-4">
                    {
                      tagColors.map((color, index) => {
                        let active = color === tagColor ? "tagActive" : "";
                        return <div key={index} onClick={() => this.setState({tagColor: color})} className={`mr-1 mb-1 tagColor ${active}`} style={{backgroundColor: color, }}></div>
                      })
                    }
                  </div>
              </div>
              {searchCountry}
            </div>
            <div className="text-center mt-1">
              <button type="submit" className={`${button} btn btn-light btn-lg px-4`}
                onClick={this.addProject}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}