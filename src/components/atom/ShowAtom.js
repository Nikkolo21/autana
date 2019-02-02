import React, { Component } from 'react'
import { connect } from 'react-redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { bindActionCreators } from 'redux';
import { base } from '../../base';
import ElementView from '../util/view/ElementView';

class ShowAtom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atom: {}
        }
    }

    componentWillMount() {
        this.props._atomSectionIsFetching(true);
        this.projectRef = base.listenTo(`atoms/${this.props.match.params.atom_id}/basic`, {
            context: this,
            asArray: false,
            then(atom) {
                this.setState({ atom })
                this.props._atomSectionIsFetching(false);
            }
        });
    }

    render() {
        const { atom } = this.state;
        return (
            <div className="row my-2 my-md-3 my-lg-5 px-2 px-md-3 px-lg-5">
                <div className="pr-1 col-md-3">
                    <div id="menuAtomSection" className="card card-body">
                        <div className="p-2 p-md-3 p-lg-5">
                            basic
                        </div>
                    </div>
                </div>
                <div className="pl-1 col-12 col-md-9">
                    <div id="contentAtomSection" className="card card-body p-2 p-md-3 p-lg-5">
                        <p><a className="ctaButton px-2 my-2 float-right">Edit</a></p>
                        <ElementView title="Nombre" value={atom.name} />
                        <ElementView title="Descripción" value={atom.description} />
                        <ElementView title="Fecha de creación" value={atom.creationDate} />
                        <ElementView title="Tipo" value={atom.selectedType} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _atomSectionIsFetching: atomSectionIsFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ShowAtom);