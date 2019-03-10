import React, { Component } from 'react'
import Project from './Project';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isFetching } from '../../actions/projects/projects';
import { bindActionCreators } from 'redux';
import { getProjectsByUserId } from '../../services/projectServices';

class Projects extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            atoms: [],
        };
    }

    componentDidMount() {
        this.props._projectIsFetching();
        getProjectsByUserId(this.props.uid, { orderBy: "creationDate", orderType: "desc" }, response => {
            this.props._projectIsFetching();
            response.forEach((doc) => {
                this.setState({ projects: [...this.state.projects, { ...doc.data(), key: doc.id }] });
            });
        }, error => {
            this.props._projectIsFetching();
            console.log(error);
        });
    }

    render() {
        const { projects } = this.state;
        const projectsRender = projects[0] ? projects.map((project, index) => {
            return (<Project uid={this.props.uid} key={index} project={project} />)
        }) : false
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-md-2 px-lg-4">
                <div className="col-3 text-center">
                    <div className="card card-body">
                        <p className="mt-2">
                            <Link to='create_project' className="ctaButton py-2"> Create Project </Link>
                        </p>
                    </div>
                </div>
                <div className="col-9">
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
        _projectIsFetching: isFetching
    }, dispatch)
)

const mapStateToProps = state => ({
    uid: state.auth.uid,
    loading: state.projects.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
