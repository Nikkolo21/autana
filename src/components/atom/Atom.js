import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { timeStampToDate } from '../../helpers';

export default class Atom extends Component {
  render() {
    let { atom: { key, name, creationDate } } = this.props;
    let date = timeStampToDate(creationDate);
    return (
      <div className="py-5 px-5 card card-body mb-2">
        <Link className="projectTitle" to={{ pathname: `/atom/${key}` }}>
          <h4 className="ml-3 ml-md-5">{name}</h4>
        </Link>
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