import React, { Component } from 'react'
import Project from './Project';
import { base } from '../../base';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isFetching } from '../../actions/projects/projects';
import { bindActionCreators } from 'redux';

class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projects: []
        };
    }

    componentWillMount() {
        this.props._isFetching();
        this.projectsRef = base.syncState(`users/${this.props.uid}/projects`, {
            context: this,
            state: 'projects',
            asArray: true,
            queries: {
                //limitToFirst: 4
            },
            then() {
                this.props._isFetching();
            }
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.projectsRef);
    }

    render() {
        const { projects } = this.state;
        const projectsRender = projects[0] ? projects.map((project, index) => {
            return (<Project uid={this.props.uid} key={index} project={project} />)
        }) : false
        return (
            <div className="px-5">
                <p className="text-right my-4 mr-lg-5">
                    <Link to='create_project'> Add Project </Link>
                </p>
                <div className="mt-3 px-lg-5">
                    {!this.props.loading ?
                        (projectsRender || (<h5 className="text-center mt-5"> UPS! Seems you have not projects</h5>)) :
                        ("loading")
                    }
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _isFetching: isFetching
    }, dispatch)
)

const mapStateToProps = state => ({
    uid: state.auth.uid,
    loading: state.projects.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Projects));
