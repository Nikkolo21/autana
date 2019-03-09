import React, { Component } from 'react'
import Project from './Project';
import { firestoreDB } from '../../base';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isFetching } from '../../actions/projects/projects';
import { bindActionCreators } from 'redux';

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
        firestoreDB.collection("projects").where("userId", "==", this.props.uid).orderBy("creationDate", "desc")
            .get({ userId: this.props.uid }).then((querySnapshot) => {
                this.props._projectIsFetching();
                querySnapshot.forEach((doc) => {
                    this.setState({ projects: [...this.state.projects, { ...doc.data(), key: doc.id }] });
                });
            });
    }

    render() {
        const { projects } = this.state;
        const projectsRender = projects[0] ? projects.map((project, index) => {
            return (<Project uid={this.props.uid} key={index} project={project} />)
        }) : false
        return (
            <div className="row mt-4 px-md-3 px-lg-5">
                <div className="col-3 text-center">
                    <div className="card card-body">
                        <p className="">
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
