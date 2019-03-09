import React, { Component } from 'react';
import { firestoreDB } from '../../base';
import { isFetching } from '../../actions/projects/projects';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { timeStampToDate } from '../../helpers';
import ElementView from '../util/view/ElementView';

class BasicProjectInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {}
        }
    }

    _activeEdit = () => {
        this.setState({ edit: !this.state.edit })
        this.state.edit && this.state.changed && this._handleSubmit();
    }

    componentDidMount() {
        this._searchProjectBasicInfo();
    }

    _searchProjectBasicInfo = () => {
        this.props._projectIsFetching();
        firestoreDB.collection("projects").doc(this.props.project_id)
            .get().then((doc) => {
                this.props._projectIsFetching();
                this.setState({ key: doc.id, ...doc.data() });
            }).catch(error => {
                this.props._projectIsFetching();
                console.log(error);
            });
    }

    _handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value, changed: true });
    }

    _validForm = () => {
        let { name, tag, shortDescription } = this.state;
        return name && tag && shortDescription;
    }

    _handleSubmit = () => {
        if (this._validForm()) {
            const updateDate = new Date().getTime();
            const { name, tag, shortDescription } = this.state;
            firestoreDB.collection("projects").doc(this.props.project_id).set({
                name,
                tag,
                shortDescription,
                updateDate
            }, { merge: true }).then(data => {
                this._searchProjectBasicInfo();
            }).catch(error => {
                console.log(error);
            });
        }
    }

    render() {
        const { name, tag, shortDescription, creationDate, updateDate } = this.state;
        return (
            <div id="contentAtomSection"
                className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 mb-5 ${this.props.config.className}`}>
                <p>
                    <a className={`ctaButton px-2 my-2 float-right ${this.state.edit && 'ctaButtonActive'}`}
                        onClick={this._activeEdit}>{this.state.edit ? 'Save Info' : 'Edit info'}</a>
                </p>
                <ElementView config={{ maxLength: 40 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="name" title="Name" value={name} />
                <ElementView config={{ maxLength: 5 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="tag" title="Tag" value={tag} />
                <ElementView config={{ maxLength: 40 }} textarea={false} onChangeFn={this._handleEvent} edit={this.state.edit} name="shortDescription" title="Short description" value={shortDescription} />
                {
                    creationDate && <ElementView title="Creation date | Update date"
                        value={`
                        ${timeStampToDate(creationDate).withHour} | 
                        ${timeStampToDate(updateDate).withHour}
                    `} />
                }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _projectIsFetching: isFetching
    }, dispatch)
)

const mapStateToProps = state => ({
    loading: state.projects.isFetching
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BasicProjectInfo));