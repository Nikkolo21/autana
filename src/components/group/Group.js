import React, { Component } from 'react'
import PropTypes from 'prop-types';

export default class Group extends Component {
    constructor () {
        super();
        this.state = {
            showInfo: false
        }
    }

    onDeleteClick = () => {
      this.props.deleteClickHandler();
    }

    render() {
      const {group: {title, description, users}} = this.props;
      const {showInfo} = this.state;
      return (
        <div className="card card-body mb-3">
        <h4 onClick={() => this.setState({showInfo: !this.state.showInfo})}>{title}
          <i className="fas fa-times" style={{float: 'right', color: 'red', cursor: 'pointer'}} onClick={this.onDeleteClick}></i>
        </h4>
        { showInfo ? 
        (
          <ul className="list-group">
          <li className="list-group-item">{description}</li>
          <li className="list-group-item">{users}</li>
        </ul>
        ) : null}
      </div>
    )
  }
}

Group.propType = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  deleteClickHandler: PropTypes.func.isRequired
}