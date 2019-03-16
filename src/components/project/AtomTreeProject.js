import React, { Component } from 'react';
import { getTreeByProjectId } from '../../services/projectServices';
import './Tree.css';
import { getAtom } from '../../services/atomServices';

class TreeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const { elem } = this.props;
        getAtom(elem.id, doc => {
            this.setState({ ...doc.data() });
        }, error => {
            console.log(error);
        })
    }
    render() {
        const { elem } = this.props;
        const { name } = this.state;
        return (
            <div className="treeBox">
                <div className="row">
                    {
                        name &&
                        <div className={`treeElem ${elem.type}`}>
                            <p> {name} : {elem.order} </p>
                        </div>
                    }
                </div>
            </div>
        )
    }
}


export default class AtomTreeProject extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._searchProjectTreeInfo();
    }

    _searchProjectTreeInfo = () => {
        getTreeByProjectId(this.props.project_id, response => {
            response.forEach(elem => this.setState({ ...elem.data() }));
        }, error => {
            console.log(error);
        });
    }

    render() {
        const { project_name, tree } = this.state;
        return (
            <div className={`card card-body py-5 ${this.props.config.className}`}>
                {
                    tree &&
                    <div className="treeBox">
                        <div className="row">
                            <div className="project treeElem"> {project_name}</div>
                        </div>
                        {
                            tree.sort((a, b) => a.order - b.order).map((elem, key) => {
                                return <TreeElement key={key} elem={elem} />
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}
