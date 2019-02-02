import React, { Component } from 'react';
import './elementView.css';

export default class ElementView extends Component {
    render() {
        return (
            <div className="elementsContent">
                <div className="py-1 elementsContentTitle">
                    {this.props.title}:
                </div>
                <h6 className="pt-1">
                    {this.props.value}
                </h6>
            </div>
        )
    }
}
