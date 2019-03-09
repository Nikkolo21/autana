import React, { Component } from 'react';
import './Menu.css';

export default class MenuDisplayLink extends Component {
    showView = () => {
        const { setViewFn, viewName } = this.props;
        setViewFn(viewName);
    }
    render() {
        const { activeView, viewName, atom } = this.props;
        return (
            <div onClick={this.showView}
                className={`menuElem p-2 p-md-3 px-lg-5 py-lg-4 ${atom ? 'menuAtomsElem' : 'menuProjectsElem'}
                    ${activeView === viewName && (atom ? 'activeMenuAtoms' : 'activeMenuProjects')}`}>
                {viewName}
            </div>
        )
    }
}
