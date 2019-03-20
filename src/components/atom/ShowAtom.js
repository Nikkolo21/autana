import React, { Component } from 'react';
import { connect } from 'react-redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { bindActionCreators } from 'redux';
import BasicAtomInfo from './BasicAtomInfo';
import TechAtomInfo from './TechAtomInfo';
import PubAtomInfo from './PubAtomInfo';
import MenuDisplayLink from '../menu/MenuDisplayLink';

class ShowAtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'Basic',
            views: [
                "Basic",
                "Technical",
                "Publication",
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
                <div className="col-4 col-md-3 mb-2">
                    <div className="card card-body p-3">
                        {
                            views.map((elem, index) => {
                                return <MenuDisplayLink key={index} setViewFn={this.setDisplayView}
                                    activeView={view} viewName={elem} atom={true} />
                            })
                        }
                    </div>
                </div >
                {view === 'Basic' &&
                    <BasicAtomInfo config={{ className: 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
                {view === 'Technical' &&
                    <TechAtomInfo config={{ className: 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
                {view === 'Publication' &&
                    <PubAtomInfo config={{ className: 'col-8 col-md-9' }} atom_id={this.props.match.params.atom_id} />}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    isFetching: state.atoms.isFetching
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _atomSectionIsFetching: atomSectionIsFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ShowAtom);