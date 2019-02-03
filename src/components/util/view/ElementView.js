import React, { Component } from 'react';
import './elementView.css';

export default class ElementView extends Component {
    render() {
        return (
            <div className="elementsContent">
                <div className="py-1 elementsContentTitle">
                    {this.props.title}:
                </div>
                {
                    this.props.countries ?
                        (
                            this.props.value.map((elem, index) => {
                                return <img title={elem.name} key={index} alt={elem.name}
                                    className="queryCountryImg mr-3 my-2" src={`/imgs/flags/${elem.icon}`}
                                    style={{ width: "2rem", height: "2rem" }} />
                            })
                        ) :
                        (
                            <h6 className="pt-1">
                                {this.props.value}
                            </h6>
                        )
                }
            </div>
        )
    }
}
