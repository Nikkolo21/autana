import React, { Component } from 'react';
import './Atom.css';
import {base} from '../../base';
import { connect } from 'react-redux';
import {openAndCloseModal} from '../../actions';

class AddAtom extends Component {
    constructor () {
        super();
        this.state = {
            projects: []
        };
    }

    componentWillMount () {
        this.projectsRef = base.listenTo(`users/${this.props.uid}/projects`, {
            context: this,
            asArray: true,
            queries: {
                //limitToFirst: 4
            },
            then(projects){
                this.setState({projects});
            }
        });
    }

    componentWillUnmount () {
        base.removeBinding(this.projectsRef);
    }

    render() {
        let button = false ? "enabled ": "disabled ";
        const {closeModal} = this.props;
        return (
            <div className="addAtomBody">
                <div className="card basic-form">
                    <small className="text-right pt-3 pr-3 pt-md-5 pr-md-5">
                        <a style={{color: "red", textDecoration: "none", cursor: "pointer"}} onClick={closeModal}>Close</a>
                    </small>
                    <div className="text-center text-white card-header bg-addProject py-2">
                        <h4 className="title">Create Atom</h4>
                    </div>
                    <div className="card-body py-5 px-md-5 text-left">
                        <div className="px-md-5">
                            <div className="form-group">
                                <label>Name*</label>
                                <input type="text" className="form-control px-4 py-2" name="name" id="name" onChange={this.handleEvent}/>
                            </div>
                            <div className="form-group">
                                <label>Description*</label>
                                <textarea type="text" className="form-control" name="description" id="description" onChange={this.handleEvent}/>
                            </div>
                            <div className="form-group">
                                <label>Select project*</label><br/>
                                {
                                    this.state.projects.map((project, index)=> {
                                        return (<small className="py-2 px-3 mb-1 mr-1 selectProject" key={index} style={{backgroundColor: project.tagColor}}>{project.name}</small>)
                                    })
                                }
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

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => {
            dispatch(openAndCloseModal(false));
        }
    };
}

const mapStateToProps = state => {
  return {
    isOpen: state.atoms.modal
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAtom);