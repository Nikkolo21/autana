import React, { Component } from 'react';
import {countries} from './json/countries';
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

    searchCountry (e) {
        e.target.value ? 
          this.setState({searchedCountries: 
            countries.filter((country) => {
              if (new RegExp(e.target.value, "i").test(country.name)) {
                return country;
              }
              return null;
            })
          })
        :
        this.setState({searchedCountries: []})
    }

    addCountry (e) {
        this.setState({searchedCountries: [], selectedCountries: this.state.selectedCountries.concat(e)})
        this.props.method(this.state.selectedCountries.concat(e));
    }

    deleteCountry(e) {
        const newSelectedCountries = this.state.selectedCountries.filter((sc) => {
            return sc !== e
        })
        this.props.method(newSelectedCountries);
        this.setState({selectedCountries: newSelectedCountries});
    }
  
    render() {
        let qc = this.state.searchedCountries.map((qc, i) => {
            return (<p className="click" key={i} onClick={this.addCountry.bind(this, qc)}> {qc.name}</p>)
        })
        let sc = this.state.selectedCountries.map((sc, i) => {
            return (<div className="click selectedCountry py-3 px-3 mx-1" onClick={this.deleteCountry.bind(this, sc)} key={i}> {sc.name}</div>)
        })
        return (
            <div>
                <div className="form-group noMarginBot">
                    <label>{this.props.searchLabel}</label>
                    <input type="text" className="my-form-control py-4 px-4" name="users" id="users" onChange={this.searchCountry}/>
                </div>
                <div className="form-group mb-5">
                    <div type="text" className="holo py-4 px-4" name="users" id="users">
                        {qc}
                    </div>
                </div>
                <div className="row mb-4 mx-2">{sc}</div>
            </div>
        )
    }
}
