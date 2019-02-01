import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { base } from '../../base';
import { timeStampToDate } from '../../helpers';

export default class Atom extends Component {
  _onDeleteClick = () => {
    base.remove(`atoms/${this.props.atom.key}`, () => {
    }).then(() => {
      base.remove(`projects/${this.props.projectId}/atoms/${this.props.atom.key}`, error => {
      }).then(() => {
        console.log("deleted")
      })
    });
  }

  render() {
    let { atom: { key, name, creationDate } } = this.props;
    let date = timeStampToDate(creationDate);
    return (
      <div className="py-5 px-5 card card-body mb-3">
        <Link className="projectTitle" to={{ pathname: `atoms/${key}` }}>
          <h4 className="ml-3 ml-md-5">{name}</h4>
        </Link>
        <i className="fas fa-times" title="delete atom"
          style={{ right: '20px', top: "20px", fontSize: '20px', color: 'pink', cursor: 'pointer', position: "absolute" }}
          onClick={this._onDeleteClick} />
        <small style={{ position: "absolute", right: "10px", bottom: "10px", color: "rgba(10,10,10,0.3)" }}
          title={`creation date: ${date.withHour}`}>
          {date.withOutHour}
        </small>
      </div>
    )
  }
}

Atom.propType = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  users: PropTypes.string.isRequired
}