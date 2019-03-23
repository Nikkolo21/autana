import React, { Component } from 'react';
import { connect } from 'react-redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { bindActionCreators } from 'redux';
import BasicAtomInfo from './BasicAtomInfo';
import TechAtomInfo from './TechAtomInfo';
import PubAtomInfo from '../pub/PubAtomInfo';
import MenuDisplayLink from '../menu/MenuDisplayLink';
import TopMenu from '../menu/TopMenu';

class ShowAtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'Basic',
            views: [
                { name: 'Basic' },
                { name: 'Technical' },
                { name: 'Publication' },
            ],
        }
    }

    _setDisplayView = (view) => {
        this.setState({ view });
    }

    render() {
        const { view, views } = this.state;
        const { isMobile } = this.props;
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-md-2 px-lg-4">
                {
                    isMobile ?
                        <TopMenu onClickFn={this._setDisplayView} menu={views} active={view} activeClass="activeMenuAtoms" /> :
                        <div className="col-4 col-md-3 mb-2">
                            <div className="card card-body p-3">
                                {
                                    views.map((elem, index) => {
                                        return <MenuDisplayLink key={index} setViewFn={this._setDisplayView}
                                            activeView={view} viewName={elem.name} atom={true} />
                                    })
                                }
                            </div>
                        </div>
                }
                {view === 'Basic' &&
                    <BasicAtomInfo config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
                {view === 'Technical' &&
                    <TechAtomInfo config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
                {view === 'Publication' &&
                    <PubAtomInfo config={{ className: isMobile ? 'col-12' : 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.atoms.isFetching,
    isMobile: state.app.is_mobile,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _atomSectionIsFetching: atomSectionIsFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ShowAtom);