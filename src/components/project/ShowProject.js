import React, { Component, Fragment } from 'react'
import { base } from '../../base';
import { Link } from 'react-router-dom';
import Atom from '../atom/Atom';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ShowProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atoms: []
        }
    }
    componentWillMount() {
        this.props._atomSectionIsFetching(true);
        const projectId = this.props.match.params.id;
        this.projectRef = base.listenTo(`projects/${projectId}/atoms`, {
            context: this,
            //state: 'atoms',
            asArray: true,
            queries: {
                orderByChild: 'creationDate',
                //limitToLast: 100
            },
            then(atoms) {
                //base.removeBinding(this.projectRef);
                this.setState({ atoms: atoms.slice(0).reverse() })
                this.props._atomSectionIsFetching(false);
            }
        });
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
                        <Link to='/my_projects' style={{ color: "red", textDecoration: "none" }}> Go back </Link>
                    </small>
                </div>
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