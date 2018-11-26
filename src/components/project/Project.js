import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { base } from '../../base';

export default class Project extends Component {
    constructor () {
        super();
        this.state = {
            showInfo: false
        }
    }
    
    onDeleteClick = () => {
      base.remove(`projects/${this.props.project.key}`, () => {
      }).then(() => {
        base.remove(`users/${this.props.uid}/projects/${this.props.project.key}`, error => {
        }).then(()=> {
          console.log("deleted")
        })
      });
    }
    
    render() {
      let {project: {key, name, tagColor}} = this.props;
      return (
        <div className="p-5 card card-body mb-3" style={{borderLeft: `solid 3px ${tagColor}`}}>
          <Link className="projectTitle" to={{ pathname: `my_projects/${key}`}}>
            <h4>{name}</h4>
          </Link>
          <i className="fas fa-times deleteX" title="delete project" onClick={this.onDeleteClick}></i>
        </div>
    )
  }
}