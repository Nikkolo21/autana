import React, { Component } from 'react';
import { elsMinCarByRes } from '../../../helpers';
import './Caroussel.css';
import CarousselElement from './CarousselElement';

export default class MiniCaroussel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                first: 0,
                last: elsMinCarByRes()
            },
            carElems: elsMinCarByRes()
        }
    }
    _upOrDownCaroussel = (type = 'D') => {
        const { position: { first, last }, carElems } = this.state;
        const { atoms: { length } } = this.props;
        let elementsByWidth = elsMinCarByRes()
        let initialElem = { first: 0, last: elementsByWidth }
        let initialQuestion = elementsByWidth === carElems;

        if (type === 'D') {
            if (first === 0) {
                this.setState({
                    position: initialQuestion ? {
                        first: length - carElems,
                        last: length
                    } : initialElem,
                    carElems: elementsByWidth
                })
            }
            else {
                this.setState({
                    position: initialQuestion ?
                        { first: first - 1, last: last - 1 } :
                        initialElem,
                    carElems: elementsByWidth
                })
            }
        }
        else {
            if (last === length) {
                this.setState({
                    position: initialQuestion ?
                        { first: 0, last: carElems } :
                        initialElem,
                    carElems: elementsByWidth
                })
            }
            else {
                this.setState({
                    position: initialQuestion ?
                        { first: first + 1, last: last + 1 } :
                        initialElem,
                    carElems: elementsByWidth
                })
            }
        }
    }

    render() {
        const { project_key } = this.props;
        const squares = this.props.atoms.slice(this.state.position.first, this.state.position.last).map((square, index) => {
            return (
                <CarousselElement project_key={project_key} square={square} key={index} />
            )
        })
        return (
            <div className="carousselContainer">
                {
                    this.props.atoms.length > this.state.carElems &&
                    <div className="leftRow" onClick={() => this._upOrDownCaroussel('D')}>
                        <i>-</i>
                    </div>
                }
                {squares}
                {
                    this.props.atoms.length > this.state.carElems &&
                    <div className="rightRow" onClick={() => this._upOrDownCaroussel('U')}>
                        <i>+</i>
                    </div>
                }
            </div>
        )
    }
}
