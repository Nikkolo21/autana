import React, { Component } from 'react'

export default class TechAtomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tech_atom: {}
        }
    }

    _activeEdit() {
        console.log("edit");
    }

    render() {
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 ${this.props.config.className}`}>
                <p>
                    <a className={`ctaButton px-2 my-2 float-right ${this.state.edit && 'ctaButtonActive'}`}
                        onClick={this._activeEdit}>{this.state.edit ? 'Save Info' : 'Edit info'}</a>
                </p>
            </div>
        )
    }
}
