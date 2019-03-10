import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openAndCloseModal } from '../../actions';
import { bindActionCreators } from 'redux';
import { isFetching } from '../../actions/atoms/addAtoms';
import { createAtom } from '../../services/atomServices';
import { getTreeByProjectId, updateProjectTree, getProjectsByUserId } from '../../services/projectServices';
import SearchCountry from '../SearchCountry';
import BasicInput from '../util/BasicInput';
import './Atom.css';

class AddAtom extends Component {
    constructor() {
        super();
        this.state = {
            projects: [],
            selectedCountries: []
        };
    }

    componentDidMount() {
        getProjectsByUserId(this.props.uid, { orderBy: "creationDate", orderType: "desc" }, querySnapshot => {
            querySnapshot.forEach((doc) => {
                this.setState({ projects: [...this.state.projects, { key: doc.id, ...doc.data() }] });
            });
        }, error => {
            console.log(error);
        });
    }

    _handleEvent = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    _getSelectedCountries = (countries) => {
        this.setState({ selectedCountries: countries });
    }

    _chooseProject = (e) => {
        this.setState({ choosedProject: e.target.id === this.state.choosedProject ? false : e.target.id });
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        let { _isFetching, _closeModal } = this.props;
        if (this._validForm()) {
            _isFetching(true);
            const { name, tag, description, selectedCountries, choosedProject } = this.state;
            const { selectedType } = this.props;
            const creationDate = new Date().getTime();
            const atomObj = {
                name,
                tag,
                description,
                selectedCountries,
                projectId: choosedProject,
                selectedType,
                userId: this.props.uid,
                isPublished: false,
                creationDate,
                updateDate: creationDate
            }
            createAtom(atomObj, atomResponse => {
                getTreeByProjectId(choosedProject, treeResponse => {
                    treeResponse.forEach(treeElem => {
                        updateProjectTree(treeElem.id, {
                            updateDate: creationDate,
                            tree: [
                                ...treeElem.data().tree,
                                {
                                    type: "atom",
                                    id: atomResponse.id,
                                    name,
                                    order: treeElem.data().tree.length + 1 || 1
                                }
                            ],
                        }, data => {
                            _isFetching(false);
                            _closeModal();
                        }, error => {
                            _isFetching(false);
                            console.log(error);
                        });
                    });
                }, error => { console.log(error) })
            }, error => {
                _isFetching(false);
                console.error(error);
            });
        }
    }

    _validForm = () => {
        let { name, tag, description, selectedCountries, choosedProject } = this.state;
        let { selectedType } = this.props;
        return name && tag && description && choosedProject && selectedType && selectedCountries[0];
    }

    render() {
        const { _closeModal, loading } = this.props;
        const { projects, choosedProject } = this.state
        let button = this._validForm() && !loading ? "enabled " : "disabled ";
        return (
            <div className="addAtomBody">
                <div className="card basic-form">
                    <small className="text-right pt-3 pr-3 pt-md-5 pr-md-5">
                        <a style={{ color: "red", textDecoration: "none", cursor: "pointer" }} onClick={_closeModal}>Close</a>
                    </small>
                    <div className="text-center text-white card-header bg-addProject py-2">
                        <h4 className="title">Create Atom</h4>
                    </div>
                    <form className="card-body py-5 px-md-5 text-left" onSubmit={this._handleSubmit}>
                        <div className="px-md-5">
                            <div className="form-group">
                                <label>Name*</label>
                                <input type="text" className="form-control p-4" name="name" id="name" onChange={this._handleEvent} />
                            </div>
                            <div className="form-group">
                                <label>Tag*</label>
                                <input type="text" maxLength="5" className="my-form-control p-4" name="tag" id="tag" onChange={this._handleEvent} />
                            </div>
                            <div className="form-group">
                                <label>Description*</label>
                                <textarea type="text" className="form-control" name="description" id="description" onChange={this._handleEvent} />
                            </div>
                            <div className="form-group">
                                <label>Select type of atom*</label>
                                <BasicInput data={[
                                    { value: "design", text: "Design" },
                                    { value: "coding", text: "Coding" }
                                ]} />
                            </div>
                            <div className="form-group">
                                <label>Select project*</label><br />
                                {
                                    projects.map((project, index) => {
                                        return (
                                            <small title={project.name}
                                                id={project.key} onClick={this._chooseProject}
                                                className={`py-2 px-3 mb-1 mr-1 selectProject
                                                ${choosedProject === project.key ? "selectProjectActive" : ""}`}
                                                key={index} style={{ backgroundColor: project.tagColor }}>
                                                {choosedProject === project.key ?
                                                    <i style={{ color: 'white', fontSize: '12px' }}> {project.tag} &#32; &#8226;</i> : project.tag}
                                            </small>
                                        )
                                    })
                                }
                            </div>

                            <SearchCountry method={this._getSelectedCountries}
                                searchLabel="Where are you looking for nomads?" size={5} />
                        </div>
                        <div className="text-center">
                            <button type="submit"
                                className={`${button} btn btn-light btn-lg px-4`}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        _closeModal: openAndCloseModal,
        _isFetching: isFetching
    }, dispatch)
)

const mapStateToProps = state => ({
    isOpen: state.atoms.modal,
    uid: state.auth.uid,
    loading: state.add_atom.isFetching,
    selectedType: state.input.data
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddAtom);