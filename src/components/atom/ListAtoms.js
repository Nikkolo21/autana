import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { firestoreDB } from '../../base';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import Atom from '../atom/Atom';

class ListAtoms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atoms: [],
        }
    }
    componentDidMount() {
        this.props._atomSectionIsFetching(true);
        this.unsubscribe = firestoreDB.collection("atoms").where("projectId", "==", this.props.project_id).orderBy("creationDate", "desc")
            .onSnapshot((querySnapshot) => {
                this.setState({ atoms: [] })
                this.props._atomSectionIsFetching(false);
                querySnapshot.forEach((doc) => {
                    !this.state.atoms.includes({ key: doc.id, ...doc.data() }) &&
                        this.setState({ atoms: [...this.state.atoms, { key: doc.id, ...doc.data() }] });
                });
            })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        const { atoms } = this.state;
        const { atomIsFetching } = this.props;
        const atomsRender = atoms[0] ? atoms.map((atom, index) => {
            return (<Atom projectId={this.props.project_id} key={index} atom={atom} />)
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
    atomIsFetching: state.atoms.isFetching
})

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _atomSectionIsFetching: atomSectionIsFetching
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(ListAtoms);