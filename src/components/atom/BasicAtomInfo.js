import React, { Component } from 'react'
import { timeStampToDate } from '../../helpers';
import ElementView from '../util/view/ElementView';
import { firestoreDB } from '../../base';
import { atomSectionIsFetching } from '../../actions/atoms/atoms';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class BasicAtomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atom: {}
        }
    }

    _activeEdit = () => {
        this.setState({ edit: !this.state.edit })
        this.state.edit && this.state.changed && this._handleSubmit();
    }

    _searchAtomBasicInfo = () => {
        this.props._atomSectionIsFetching(true);
        firestoreDB.collection("atoms").doc(this.props.atom_id)
            .get().then((doc) => {
                this.props._atomSectionIsFetching(false);
                this.setState({ key: doc.id, ...doc.data() });
            }).catch(error => {
                this.props._atomSectionIsFetching(false);
                console.log(error);
            });
    }

    componentDidMount() {
        this._searchAtomBasicInfo();
    }

    _handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value, changed: true });
    }

    _validForm = () => {
        let { name, tag, description, selectedCountries, selectedType } = this.state;
        return name && tag && description && selectedType && selectedCountries[0];
    }

    _handleSubmit = () => {
        if (this._validForm()) {
            const updateDate = new Date().getTime();
            const { name, tag, description, selectedType, selectedCountries } = this.state;
            firestoreDB.collection("atoms").doc(this.props.atom_id).set({
                name,
                tag,
                description,
                selectedCountries,
                selectedType,
                updateDate
            }, { merge: true }).then(data => {
                this._searchAtomBasicInfo();
            }).catch(error => {
                console.log(error);
            });
        }
    }


    _getSelectedCountries = (countries) => {
        this.setState({ selectedCountries: countries, changed: true });
    }

    _setEditFalse = () => {
        this.setState({ edit: false });
    }

    render() {
        let { name, tag, description, selectedType, selectedCountries, creationDate, updateDate } = this.state;
        return (
            <div className="pl-1 col-12 col-md-9">
                <div id="contentAtomSection" className="card card-body p-2 p-sm-3 p-md-4 p-lg-5">
                    <p>
                        <a className={`ctaButton blueCtaButton px-2 my-2 float-right ${this.state.edit && 'ctaButtonActive'}`}
                            onClick={this._activeEdit}>{this.state.edit ? 'Save Info' : 'Edit info'}</a>
                        {this.state.edit && <a className="ctaButton px-2 my-2 float-right"
                            onClick={this._setEditFalse}>Cancel</a>}
                    </p>
                    <ElementView config={{ maxLength: 40 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="name" title="Name" value={name} />
                    <ElementView config={{ maxLength: 5 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="tag" title="Tag" value={tag} />
                    <ElementView config={{ maxLength: 500 }} textarea={true} onChangeFn={this._handleEvent} edit={this.state.edit} name="description" title="Description" value={description} />
                    <ElementView config={{ maxLength: 10 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="selectedType" title="The type of this atom is" value={selectedType} />
                    {
                        creationDate && <ElementView title="Creation date | Update date"
                            value={`
                            ${timeStampToDate(creationDate).withHour} | 
                            ${timeStampToDate(updateDate).withHour}
                        `} />
                    }
                    {
                        selectedCountries &&
                        <ElementView defaultCountries={selectedCountries} edit={this.state.edit} getSelectedCountries={this._getSelectedCountries} title="I'm looking for nomads in" value={selectedCountries} countries={true} />
                    }

                    {
                        this.state.edit &&
                        <p>
                            <a className="ctaButton blueCtaButton px-2 float-right ctaButtonActive"
                                onClick={this._activeEdit}>Save Info</a>
                            <a className="ctaButton px-2 float-right"
                                onClick={this._setEditFalse}>Cancel</a>
                        </p>
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