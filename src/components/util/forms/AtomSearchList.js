import React, { Component } from 'react'

export default class AtomSearchList extends Component {
    render() {
        return (
            <div>
                <input style={{ width: "100px", height: "30px", backgroundColor: "blue" }} id='searchAtom' type='search' />
            </div>
        )
    }
}
