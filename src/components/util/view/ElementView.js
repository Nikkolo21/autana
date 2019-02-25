import React, { Component } from 'react';
import './elementView.css';
import SearchCountry from '../../SearchCountry';

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
                            this.props.edit ?
                                <SearchCountry defaultCountries={this.props.defaultCountries} method={this.props.getSelectedCountries} size={5} /> :
                                this.props.value.map((elem, index) => {
                                    return <img title={elem.name} key={index} alt={elem.name}
                                        className="queryCountryImg mr-3 my-2" src={`/imgs/flags/${elem.icon}`}
                                        style={{ width: "2rem", height: "2rem" }} />
                                })
                        ) :
                        (
                            this.props.edit ?
                                this.props.textarea ?
                                    <textarea {...this.props.config} name={this.props.name} onChange={this.props.onChangeFn} value={this.props.value} /> :
                                    <input {...this.props.config} name={this.props.name} onChange={this.props.onChangeFn} value={this.props.value} /> :
                                (<h6 className="pt-1">
                                    {this.props.value}
                                </h6>)
                        )
                }
            </div>
        )
    }
}
