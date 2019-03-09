import React, { Component } from 'react'

export default class TechProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tech_project: {}
        }
    }

    render() {
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 ${this.props.config.className}`}>

            </div>
        )
    }
}
