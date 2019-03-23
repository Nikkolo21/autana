import React, { Component } from 'react'
import './Menu.css';

export default class TopMenu extends Component {
    state = {}
    render() {
        const { activeClass, menu, onClickFn, active } = this.props;
        return (
            <div className="topMenu">
                {
                    menu.map((elem, index) => <div key={index} onClick={() => onClickFn(elem.name)}
                        className={`child ${elem.name === active && activeClass}`} style={{ width: `${100 / menu.length}%` }}>
                        {elem.name}
                    </div>)
                }
            </div>
        )

    }
}