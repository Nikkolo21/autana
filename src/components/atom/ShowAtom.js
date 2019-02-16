import React, { Component } from 'react';
import { connect } from 'react-redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { bindActionCreators } from 'redux';
import BasicAtomInfo from './BasicAtomInfo';

class ShowAtom extends Component {
    render() {
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-2 px-md-3 px-lg-5">
                <div className="pr-1 col-md-3">
                    <div id="menuAtomSection" className="card card-body">
                        <div className="p-2 p-md-3 p-lg-5">
                            basic
                        </div>
                    </div>
                </div>
                <BasicAtomInfo atom_id={this.props.match.params.atom_id} />
            </div>
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