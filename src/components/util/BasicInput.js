import React, { Component } from 'react'
import './BasicInput.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { chooseBasicInput } from '../../actions';

class BasicIinput extends Component {
    _selectOption = (e) => {
        this.props._chooseBasicInput(e.target.value);
    }
    componentWillUnmount() {
        this.props._chooseBasicInput(false);
    }
    render() {
        return (
            <div className="col-xs-12">
                <select defaultValue="" className="basicDropdown" onChange={this._selectOption}>
                    <option value="" disabled hidden></option>
                    {this.props.data.map((option, index) => {
                        return <option key={index} value={option.value}>{option.text}</option>
                    })}
                </select>
            </div>
        )
    }
}

const mapStateToProps = state => (state)

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _chooseBasicInput: chooseBasicInput
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(BasicIinput);