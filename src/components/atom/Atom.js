import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { base } from '../../base';

export default class Atom extends Component {
  _onDeleteClick = () => {
    base.remove(`atoms/${this.props.atom.key}`, () => {
    }).then(() => {
      base.remove(`users/${this.props.uid}/atoms/${this.props.atom.key}`, error => {
      }).then(() => {
        console.log("deleted")
      })
    });
  }

  render() {
    let { atom: { key, title } } = this.props;
    return (
      <div className="py-5 px-5 card card-body mb-3">
        <Link className="projectTitle" to={{ pathname: `my_atoms/${key}` }}>
          <h4>{title}</h4>
        </Link>
        <i className="fas fa-times" title="delete atom"
          style={{ right: '20px', top: "20px", fontSize: '20px', color: 'pink', cursor: 'pointer', position: "absolute" }} onClick={this._onDeleteClick}></i>
      </div>
    )
  }
}

Atom.propType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired
}