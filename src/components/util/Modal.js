import React from 'react'
import './Modal.css';

const Modal = ({ children }) => {
  return (
    <div className="modalBox py-5">
      <div className="modalChild">
        {children}
      </div>
    </div>
  )
}
export default Modal;