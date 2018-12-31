import React, { Component } from 'react'
import {base} from '../../base';
import { Link } from 'react-router-dom';

export default class ShowProject extends Component {
    componentWillMount () {
        const projectId = this.props.match.params.id;
        this.projectRef = base.syncState(`project/${projectId}`, {
            context: this,
            state: 'project',
            asArray: false,
            then() {
                if (this.state.project) {
                    base.removeBinding(this.projectRef);
                }
            }
        });
    }

    render () {
        const atomsRender = false;
        return (
            <div className="container">
                <small className="text-right my-4">
                    <Link to='/my_projects' style={{color: "red", textDecoration: "none"}}> Go back </Link>
                </small>
                <div className="mt-3">
                    { atomsRender ? atomsRender : (<h5 className="text-center mt-5"> UPS! Seems there is not Atoms</h5>) }
                </div>
            </div>
        )
    }
}