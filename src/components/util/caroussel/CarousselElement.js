import React, { Component } from 'react'
import { timeStampToDate } from '../../../helpers';
import { Link } from 'react-router-dom';

export default class CarousselElement extends Component {
    render() {
        const { square, constant_height, constant_width } = this.props;
        let creationDate = timeStampToDate(square.creationDate);
        let updateDate = timeStampToDate(square.updateDate);
        return (
            <Link to={{ pathname: `/atom/${square.key}` }}
                className={`square ${constant_height ? 'constHeight' : 'varHeight'} ${constant_width ? 'constWidth' : 'varWidth'}`}
                onClick={this._whoIs}
            >
                <div className="squareTitle ellipsisText" title={square.name}>
                    {square.name}
                </div>
                <div>
                    {square.selectedType}
                </div>
                <div>
                    {square.isPublished ? 'Published' : 'Not published'}
                    <i style={{ color: square.isPublished ? 'green' : 'red', fontSize: "18px" }}>&#32; &#8226;</i>
                </div>
                <div className="MCcreationDate" title={`Creation date: ${creationDate.withHour} | Update date: ${updateDate.withHour}`}>
                    {creationDate.withOutHour} | {updateDate.withOutHour}
                </div>
            </Link>
        )
    }
}
