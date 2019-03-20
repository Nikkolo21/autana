import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isFetching } from '../../actions/projects/addProject';
import './Project.css';
import { createProject } from '../../services/projectServices';

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
      let creationDate = new Date().getTime();
      let { name, tag, shortDescription, tagColor } = this.state;
      createProject({
        name,
        userId: this.props.uid,
        tag,
        shortDescription,
        tagColor,
        atomsCount: 0,
        creationDate,
        updateDate: creationDate
      }, data => {
        this.setState({ toProjects: true });
      }, error => console.log(error))
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
      <div className="container mb-3 addProjectContainer" id="theBody">
        <div className="py-3">
          <small className="mb-5 pl-2">
            <Link to='/my_projects' style={{ color: "red", textDecoration: "none" }}>Go back</Link>
          </small>
        </div>
        <div className="card basic-form mx-md-2">
          <div className="text-center text-white card-header bg-addProject py-2 mt-5">
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
                        {active && <i style={{ color: 'white', fontSize: "18px" }}>&#32; &#8226;</i>}
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