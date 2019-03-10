import React, { Component } from 'react';
import { firestoreDB } from '../../base';

export default class AtomTreeProject extends Component {
    componentDidMount() {
        this._searchProjectTreeInfo();
    }

    _searchProjectTreeInfo = () => {
        firestoreDB.collection("projects.trees").where("project_id", "==", this.props.project_id)
            .get().then(response => {
                response.forEach(elem => console.log(elem.data()));
            }).catch(error => {
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