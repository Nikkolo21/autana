import React, { Component } from 'react'
import { timeStampToDate } from '../../helpers';
import ElementView from '../util/view/ElementView';
import { firestoreDB } from '../../base';
import { bindActionCreators } from 'redux';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { connect } from 'react-redux';

class BasicAtomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atom: {}
        }
    }

    componentWillMount() {
        this.props._atomSectionIsFetching(true);
        firestoreDB.collection("atoms").doc(this.props.atom_id)
            .get().then((doc) => {
                this.props._atomSectionIsFetching(false);
                this.setState({ atom: { key: doc.id, ...doc.data() } });
            }).catch(error => {
                this.props._atomSectionIsFetching(false);
                console.log(error);
            });
    }
    render() {
        const { atom } = this.state;
        return (
            <div className="pl-1 col-12 col-md-9">
                <div id="contentAtomSection" className="card card-body p-2 p-sm-3 p-md-4 p-lg-5">
                    <p><a className="ctaButton px-2 my-2 float-right">Edit info</a></p>
                    <ElementView title="Name" value={atom.name} />
                    <ElementView title="Tag" value={atom.tag} />
                    <ElementView title="Description" value={atom.description} />
                    <ElementView title="The type of this atom is" value={atom.selectedType} />
                    {
                        atom.creationDate && <ElementView title="Creation date | Update date"
                            value={`
                            ${timeStampToDate(atom.creationDate).withHour} | 
                            ${timeStampToDate(atom.updateDate).withHour}
                        `} />
                    }
                    {
                        atom.selectedCountries &&
                        <ElementView title="I'm looking for nomads in" value={atom.selectedCountries} countries={true} />
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicAtomInfo);