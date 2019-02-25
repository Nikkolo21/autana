import React, { Component, Fragment } from 'react'
import { firestoreDB } from '../../base';
import { Link } from 'react-router-dom';
import Atom from '../atom/Atom';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BasicProjectInfo from './BasicProjectInfo';

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atoms: []
        }
    }
    componentDidMount() {
        this.props._atomSectionIsFetching(true);
        this.unsubscribe = firestoreDB.collection("atoms").where("projectId", "==", this.props.match.params.id).orderBy("creationDate", "desc")
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
            return (<Atom projectId={this.props.match.params.id} key={index} atom={atom} />)
        }) : false
        return (
            <div className="px-2 px-md-5 px-lg-8 mx-lg-5">
                <div className="py-3">
                    <small className="text-right">
                        <Link to='/my_projects' className="goBackLink"> Go back </Link>
                    </small>
                </div>
                <BasicProjectInfo project_id={this.props.match.params.id} />
                <Fragment>
                    {!atomIsFetching ?
                        atomsRender || <h5 className="text-center mt-5"> Seems there is not atoms </h5> :
                        ("loading")
                    }
                </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowProject);