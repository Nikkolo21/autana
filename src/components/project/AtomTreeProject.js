import React, { Component } from 'react';
import { getTreeByProjectId } from '../../services/projectServices';

export default class AtomTreeProject extends Component {
    componentDidMount() {
        this._searchProjectTreeInfo();
    }

    _searchProjectTreeInfo = () => {
        getTreeByProjectId(this.props.project_id, response => {
            response.forEach(elem => console.log(elem.data()));
        }, error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 ${this.props.config.className}`}>

            </div>
        )
    }
}
