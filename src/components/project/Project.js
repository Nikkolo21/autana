import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { base, firestoreDB } from '../../base';
import { connect } from 'react-redux';
import { timeStampToDate } from '../../helpers';
import MiniCaroussel from '../util/caroussel/MiniCaroussel';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      atoms: [],
      atomsCount: 0,
      showCaroussel: false
    }
  }

  componentWillMount() {
    this.setState({ atomIsLoading: true });
    firestoreDB.collection("atoms").where("projectId", "==", this.props.project.key).orderBy("creationDate", "desc")
      .onSnapshot(querySnapshot => {
        this.setState({ atoms: [], atomsCount: querySnapshot.size, atomIsLoading: false });
        querySnapshot.forEach((doc) => {
          this.setState({ atoms: [...this.state.atoms, { key: doc.id, ...doc.data() }] });
        });
      })
  }

  _onDeleteClick = () => {
    base.remove(`projects/${this.props.project.key}`, () => {
    }).then(() => {
      base.remove(`users/${this.props.uid}/projects/${this.props.project.key}`, error => {
      }).then(() => {
        console.log("deleted")
      })
    });
  }

  _showCaroussel = () => {
    this.setState({ showCaroussel: !this.state.showCaroussel })
  }

  render() {
    const { project: { key, name, creationDate } } = this.props; //tagColor
    const { atoms, atomsCount, showCaroussel, atomIsLoading } = this.state;
    let date = timeStampToDate(creationDate);
    return (
      <div className="mb-3">
        <div className="card card-body">
          <div className="p-5">
            <Link className="projectTitle" to={{ pathname: `my_projects/${key}` }}>
              <h4>{name}</h4>
            </Link>
            {
              !atomIsLoading ?
                (<a className={`ctaButton showAtomsLink ${atoms[0] ? showCaroussel && 'ctaButtonActive' : 'notAtoms'}`}
                  onClick={this._showCaroussel}>
                  {
                    (atoms[0] ? `${atomsCount} ${atomsCount > 1 ? 'Atoms' : 'Atom'}` : 'Not atoms')
                  }
                </a>) :
                (<div className="atomLinkLoader"></div>)
            }
            <i className="fas fa-times deleteX" title="delete project" onClick={this._onDeleteClick} />
            <small className="cardDate"
              title={`creation date: ${date.withHour}`}>
              {date.withOutHour}
            </small>
          </div>
        </div>
        {atoms[0] && showCaroussel && <MiniCaroussel project_key={key} atoms={atoms} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  uid: state.auth.uid
})

export default connect(mapStateToProps)(Project);