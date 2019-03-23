import React, { Component } from 'react';
import BasicProjectInfo from './BasicProjectInfo';
import MenuDisplayLink from '../menu/MenuDisplayLink';
import TechProjectInfo from './TechProjectInfo';
import TreeView from '../tree/TreeView';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAsideButtons, openAndCloseAside } from '../../actions';
import { setProjectId } from '../../actions/projects/projects';
import TopMenu from '../menu/TopMenu';

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'Basic',
            views: [
                { name: "Basic" },
                { name: "Technical" },
                { name: "Tree" },
            ],
        }
    }

    componentDidMount() {
        const { _setProjectId, _showAsideButtons, match: { params: { id } } } = this.props;
        _showAsideButtons({ show: true, type: 'project' });
        _setProjectId(id);
    }

    componentWillUnmount() {
        const { _setProjectId, _showAsideButtons, _openAndCloseAside } = this.props;
        _showAsideButtons({ show: false });
        _setProjectId(null);
        _openAndCloseAside(false);
    }

    _setDisplayView = (view) => {
        this.setState({ view });
    }

    render() {
        const { view, views } = this.state;
        const { match, isMobile } = this.props;
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-md-2 px-lg-4">
                {
                    isMobile ?
                        <TopMenu onClickFn={this._setDisplayView} menu={views} active={view} activeClass="activeMenuProjects" /> :
                        <div className='col-4 col-md-3 mb-2'>
                            <div className="card card-body p-3">
                                {
                                    views.map((elem, index) => {
                                        return <MenuDisplayLink key={index} setViewFn={this._setDisplayView}
                                            activeView={view} viewName={elem.name} atom={false} />
                                    })
                                }
                            </div>
                        </div>
                }
                {view === 'Basic' &&
                    <BasicProjectInfo config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} project_id={match.params.id} />}
                {view === 'Technical' &&
                    <TechProjectInfo config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} project_id={match.params.id} />}
                {view === 'Tree' &&
                    <TreeView config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} project_id={match.params.id} />}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    aside_buttons: state.app.aside_buttons,
    isMobile: state.app.is_mobile,
})

const mapDisptachToProps = dispatch => (
    bindActionCreators({
        _showAsideButtons: showAsideButtons,
        _setProjectId: setProjectId,
        _openAndCloseAside: openAndCloseAside,
    }, dispatch)
)

export default connect(mapStateToProps, mapDisptachToProps)(ShowProject);