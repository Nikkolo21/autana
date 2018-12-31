import React, { Component } from 'react';
import { countries } from './json/countries';
import './SearchCountry.css';

export default class SearchCountry extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedCountries: [],
            selectedCountries: []
        }
        this.searchCountry = this.searchCountry.bind(this);
    }

    searchCountry(e) {
        let count = 0;
        e.target.value ?
            this.setState({
                searchedCountries:
                    countries.filter((country) => {
                        return new RegExp(e.target.value, "i").test(country.name) && count++ < 5;
                    })
            })
            :
            this.setState({ searchedCountries: [] })
    }

    addCountry(e) {
        if (!this.state.selectedCountries.includes(e)) {
            this.setState({ searchedCountries: [], selectedCountries: this.state.selectedCountries.concat(e) })
            this.props.method(this.state.selectedCountries.concat(e));
        }
    }

    deleteCountry(e) {
        const newSelectedCountries = this.state.selectedCountries.filter((sc) => {
            return sc !== e
        })
        this.props.method(newSelectedCountries);
        this.setState({ selectedCountries: newSelectedCountries });
    }

    render() {
        let queryCountries = this.state.searchedCountries.map((qc, i) => {
            return (<div className={`${this.state.selectedCountries.includes(qc) ? "selectedCountry " : "click "} p-3`}
                title={this.state.selectedCountries.includes(qc) ? "Already selected" : ""}
                key={i} onClick={this.addCountry.bind(this, qc)}>
                <span className="d-block d-sm-none">{qc.code} <img alt={qc.name} className="queryCountryImg" src={`/imgs/flags/${qc.icon}`} /> </span>
                <span className="d-none d-sm-block">{qc.name} </span>
            </div>)
        })
        let selectedCountries = this.state.selectedCountries.map((sc, i) => {
            return (<div title={sc.name} className="click selectedCountry py-1 py-md-3 px-1 px-md-3 mx-1 mb-2" onClick={this.deleteCountry.bind(this, sc)} key={i}>
                <img alt={sc.name} className="selectedCountryImg" src={`/imgs/flags/${sc.icon}`} />
            </div>)
        })
        return (
            <div>
                <div className="form-group noMarginBot">
                    <label>{this.props.searchLabel}*</label>
                    <input type="text" className="my-form-control py-4 px-4" name="users" id="users" onChange={this.searchCountry} />
                </div>
                <div className="form-group mb-5">
                    <div type="text" className="holo" name="users" id="users">
                        {queryCountries}
                    </div>
                </div>
                <div className="row mb-4 mx-2">{selectedCountries}</div>
            </div>
        )
    }
}
