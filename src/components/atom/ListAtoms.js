import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { firestoreDB } from '../../base';
import CarousselElement from '../util/caroussel/CarousselElement';
import './Atom.css';
import TreeElement from '../tree/TreeElement';

class ListAtoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atoms: [],
        }
    }
    componentDidMount() {
        this.props._atomSectionIsFetching(true);
        this.unbsubcribe = firestoreDB.collection("atoms").where("projectId", "==", this.props.project_id).orderBy("creationDate", "desc").onSnapshot(querySnapshot => {
            this.setState({ atoms: [] });
            querySnapshot.forEach((doc) => {
                this.setState({ atoms: [...this.state.atoms, { key: doc.id, ...doc.data() }] });
            });
            this.props._atomSectionIsFetching(false);
        });
    }

    componentWillUnmount() {
        this.unbsubcribe(); // unmount
    }

    render() {
        const { atoms } = this.state;
        const { atomIsFetching, asideIsListed } = this.props;
        const atomsRender = atoms[0] ? atoms.map((atom, index) => {
            return (
                asideIsListed ?
                    <TreeElement key={index} elem={{ ...atom, type: 'atom' }} /> :
                    <CarousselElement key={index} project_key={this.props.project_id} square={atom} constant_width constant_height margin_bottom />
            )
        }) : false
        return (
            <div {...this.props.config}>
                {!atomIsFetching ?
                    atomsRender || <h5 className="text-center mt-5"> Seems there is not atoms </h5> :
                    ("loading")
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    atomIsFetching: state.atoms.isFetching,
    asideIsListed: state.app.aside_listed,
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _atomSectionIsFetching: atomSectionIsFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ListAtoms);