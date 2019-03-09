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
            <div className="row my-2 my-md-3 my-lg-5 px-2 px-md-3 px-lg-5">
                <div className="pr-1 col-md-3">
                    <div id="menuAtomSection" className="card card-body">
                        {
                            views.map((elem, index) => {
                                return <MenuDisplayLink key={index} setViewFn={this.setDisplayView}
                                    activeView={view} viewName={elem} />
                            })
                        }
                    </div>
                </div >
                {view === 'Basic' &&
                    <BasicAtomInfo atom_id={this.props.match.params.atom_id} />}
                {view === 'Technical' &&
                    <TechAtomInfo atom_id={this.props.match.params.atom_id} />}
                {view === 'Publication' &&
                    <PubAtomInfo atom_id={this.props.match.params.atom_id} />}
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