import React, { Component } from 'react'
import Project from './Project';
import { base } from '../../base';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Projects extends Component {
    constructor () {
        super();
        this.state = {
            projects: []
        };
    }

    componentWillMount () {
        this.projectsRef = base.syncState(`users/${this.props.uid}/projects`, {
            context: this,
            state: 'projects',
            asArray: true,
            queries: {
                //limitToFirst: 4
            },
            then(){
            }
        });
    }

    componentWillUnmount () {
        base.removeBinding(this.projectsRef);
    }

    render() {
        const {projects} = this.state;
        const projectsRender = projects[0] ? projects.map((project, index)=> {
            return (<Project uid={this.props.uid} key={index} project={project}/>)
        }) : false
        return (
            <div className="px-5">
                <p className="text-right my-4 mr-lg-5"><Link to='create_project'> Add Project </Link></p>
                <div className="mt-3 px-lg-5">
                    { projectsRender || (<h5 className="text-center mt-5"> UPS! Seems you have not projects</h5>) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        uid: state.client.uid
    }
}

export default connect(mapStateToProps)(Projects);