import React, { Component } from 'react'
import { timeStampToDate } from '../../../helpers';
import { Link } from 'react-router-dom';

export default class CarousselElement extends Component {
    render() {
        const { square } = this.props;
        let date = timeStampToDate(square.creationDate);
        return (
            <Link to={{ pathname: `/atom/${square.key}` }} className="square" onClick={this._whoIs}>
                <div className="squareTitle">
                    {square.name}
                </div>
                <div>
                    {square.selectedType}
                </div>
                <div>
                    {square.isPublished ? 'Published' : 'Not published'}
                    <i style={{ color: square.isPublished ? 'green' : 'red', fontSize: "18px" }}>&#32; &#8226;</i>
                </div>
                <div className="MCcreationDate" title={`Creation date: ${date.withHour}`}>
                    {date.withOutHour}
                </div>
            </Link>
        )
    }
}
