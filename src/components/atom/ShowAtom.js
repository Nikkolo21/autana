import React, { Component } from 'react';
import { connect } from 'react-redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { bindActionCreators } from 'redux';
import BasicAtomInfo from './BasicAtomInfo';
import TechAtomInfo from './TechAtomInfo';

class ShowAtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'basic'
        }
    }
    _changeMenu(e) {
        console.log(e.target.name);
        //this.setState({view})
    }
    render() {
        const { view } = this.state;
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-2 px-md-3 px-lg-5">
                <div className="pr-1 col-md-3">
                    <div id="menuAtomSection" className="card card-body">
                        <div onClick={() => this.setState({ view: 'basic' })} className={`menuElem p-2 p-md-3 px-lg-5 py-lg-4 ${view === 'basic' ? 'activeMenu' : ''}`}>
                            Basic
                        </div>
                        <div onClick={() => this.setState({ view: 'tech' })} className={`menuElem p-2 p-md-3 px-lg-5 py-lg-4 ${view === 'tech' ? 'activeMenu' : ''}`}>
                            Technical
                        </div>
                    </div>
                </div>
                {view === 'basic' && <BasicAtomInfo atom_id={this.props.match.params.atom_id} />}
                {view === 'tech' && <TechAtomInfo atom_id={this.props.match.params.atom_id} />}
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