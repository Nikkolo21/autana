import React, { Component } from 'react'

export default class PubAtomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pub_atom: {}
        }
    }

    componentDidMount() {
        // console.log(this.props.atom_id);
    }

    render() {
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 ${this.props.config.className}`}>
                <div style={{ backgroundColor: "rgba(10,10,10,0.1)", width: "100%", height: "400px", borderRadius: '5px' }}></div>
            </div>
        )
    }
}
