import React, { Component } from 'react';
import './Modal.css';

export default class Modal extends Component {
  render() {
    return (
      <div className="modalBox py-5">
        <div className="modalChild">
          {this.props.children}
        </div>
      </div>
    )
  }
}
