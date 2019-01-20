import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { base } from '../../base';
import { isFetching } from '../../actions/projects/addProject';
import './Project.css';

const uuidv4 = require('uuid/v4'); //random ID

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      toProjects: false,
      buttonClass: 'disabled'
    }
  }

  _addProject = () => {
    if (this._validForm()) {
      this.props._isFetching();
      const PROJECT_ID = uuidv4();
      let { name, tag, shortDescription, tagColor } = this.state;
      this.ref = base.post(`projects/${PROJECT_ID}`, {
        data: { name, tag, shortDescription, tagColor, atomsCount: 0 }
      }).then(err => {
        if (!err) {
          this.ref = base.post(`users/${this.props.uid}/projects/${PROJECT_ID}`, {
            data: { name, tag, tagColor }
          }).then(err => {
            this.props._isFetching();
            if (!err) {
              this.setState({ toProjects: true });
            }
          })
        }
        base.removeBinding(this.ref);
      });
    }
  }

  _handleEvent = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  _selectColor = (color) => {
    this.setState({ tagColor: color !== this.state.tagColor ? color : "" });
  }

  _validForm = () => {
    let { name, tag, shortDescription, tagColor } = this.state;
    return name && tag && shortDescription && tagColor;
  }

  render() {
    let { tagColor, toProjects } = this.state;
    let { loading, tagColors } = this.props;
    let button = this._validForm() && !loading ? "enabled " : "disabled ";

    if (toProjects) {
      return <Redirect to='/my_projects' />
    }
    return (
      <div className="container my-5 addProjectContainer" id="theBody">
        <div className="card basic-form mx-md-2">
          <small className="text-right pt-5 pr-5">
            <Link to='/my_projects' style={{ color: "red", textDecoration: "none" }}>Go back</Link>
          </small>
          <div className="text-center text-white card-header bg-addProject py-2">
            <h4 className="title">Create a project</h4>
          </div>
          <div className="card-body py-5 px-md-5">
            <div className="px-md-5">
              <div className="form-group">
                <label>Name*</label>
                <input type="text" className="my-form-control p-4" name="name" id="name" onChange={this._handleEvent} />
              </div>
              <div className="form-group">
                <label>Tag*</label>
                <input type="text" maxLength="5" className="my-form-control p-4" name="tag" id="tag" onChange={this._handleEvent} />
              </div>
              <div className="form-group">
                <label>Short description*</label>
                <input type="text" className="my-form-control p-4" name="shortDescription" id="shortDescription" onChange={this._handleEvent} />
              </div>
              <div className="form-group">
                <label>Tag Color*</label>
                <div className="row px-4">
                  {
                    tagColors.map((color, index) => {
                      let active = color === tagColor;
                      return (<div key={index} onClick={this._selectColor.bind(this, color)} className={`mr-1 mb-1 tagColor ${active ? "tagActive" : ""}`} style={{ backgroundColor: color }}>
                        {active && <i className="fa fa-check" style={{ color: "white" }} />}
                      </div>)
                    })
                  }
                </div>
              </div>
            </div>
            <div className="text-center mt-1">
              <button type="submit" className={`${button} btn btn-light btn-lg px-4`}
                onClick={this._addProject}>Create</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid,
  loading: state.add_project.isFetching,
  tagColors: state.add_project.tagColors
})

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    _isFetching: isFetching
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddProject);