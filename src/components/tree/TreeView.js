import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Tree.css';
import { bindActionCreators } from 'redux';

class AtomTreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    _allowDrop = ev => {
        ev.preventDefault();
    }

    _onDrop = ev => {
        ev.preventDefault();
        let data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.appendChild(document.getElementById(data));
    }

    render() {
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 mb-5 ${this.props.config.className}`}>
                hola
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AtomTreeProject);