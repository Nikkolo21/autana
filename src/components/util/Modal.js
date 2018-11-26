import React, { Component } from 'react'
import './Modal.css';

export default class Modal extends Component {
  render() {
    const {children} = this.props;
    return (
      <div className="modalBox py-5">
        <div className="modalChild">
          {children}
        </div>
      </div>
    )
  }
}