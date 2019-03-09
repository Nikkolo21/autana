import React, { Component } from 'react'

export default class MenuDisplayLink extends Component {
    showView = () => {
        const { setViewFn, viewName } = this.props;
        setViewFn(viewName);
    }
    render() {
        const { activeView, viewName } = this.props;
        return (
            <div onClick={this.showView}
                className={`menuElem p-2 p-md-3 px-lg-5 py-lg-4 ${activeView === viewName && 'activeMenu'}`}>
                {viewName}
            </div>
        )
    }
}
