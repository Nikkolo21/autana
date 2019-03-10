import React, { Component } from 'react';
import BasicProjectInfo from './BasicProjectInfo';
import ListAtoms from '../atom/ListAtoms';
import MenuDisplayLink from '../menu/MenuDisplayLink';
import TechProjectInfo from './TechProjectInfo';
import AtomTreeProject from './AtomTreeProject';

export default class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'Basic',
            views: [
                "Basic", "Technical", "Tree", "Atoms"
            ],
        }
    }

    setDisplayView = (view) => {
        this.setState({ view });
    }

    render() {
        const { view, views } = this.state;
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-md-2 px-lg-4">
                <div className="col-12 col-sm-3 mb-2">
                    <div className="card card-body">
                        {
                            views.map((elem, index) => {
                                return <MenuDisplayLink key={index} setViewFn={this.setDisplayView}
                                    activeView={view} viewName={elem} atom={false} />
                            })
                        }
                    </div>
                </div>
                {view === 'Basic' &&
                    <BasicProjectInfo config={{ className: 'col-12 col-sm-9' }} project_id={this.props.match.params.id} />}
                {view === 'Technical' &&
                    <TechProjectInfo config={{ className: 'col-12 col-sm-9' }} project_id={this.props.match.params.id} />}
                {view === 'Tree' &&
                    <AtomTreeProject config={{ className: 'col-12 col-sm-9' }} project_id={this.props.match.params.id} />}
                {view === 'Atoms' &&
                    <ListAtoms config={{ className: 'col-12 col-sm-9' }} project_id={this.props.match.params.id} />}
            </div>
        )
    }
}