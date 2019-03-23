import React, { Component } from 'react'
import { createPub, getPubByAtomId } from '../../services/atomServices';
import './pub.css';
import TopMenu from '../menu/TopMenu';

export default class PubAtomInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'Basic'
        };
    }

    componentDidMount() {
        this._getPub();
    }

    _getPub = () => {
        this.setState({ isFetching: true });
        getPubByAtomId(this.props.atom_id, response => {
            this.setState({ isFetching: false });
            response.forEach(doc => {
                this.setState({ pub: { ...doc.data(), key: doc.id } });
            });
        }, error => {
            this.setState({ isFetching: false });
            console.log(error);
        });
    }

    _createPublication = () => {
        if (!this.state.isFetching) {
            this.setState({ isFetching: true });
            const creationDate = new Date().getTime();
            createPub({ creationDate, atomId: this.props.atom_id }, response => {
                this._getPub();
            }, error => {
                console.log(error);
            });
        }
    }

    _setMenuActive = active => {
        this.setState({ active })
    }

    render() {
        const { pub, isFetching, active } = this.state;
        return (
            <div className={`card card-body p-2 p-sm-3 p-md-4 p-lg-5 ${this.props.config.className}`}>
                {!pub ?
                    <div className="emptyPub pubBox">
                        {!isFetching && <button className="btn btn-sm btn-default btnEmptyPub mainColor" onClick={this._createPublication}> Add publication </button>}
                    </div> :
                    <div className="pubBox pubTabBox">
                        <TopMenu onClickFn={this._setMenuActive} menu={menu} active={active} activeClass="topMenuActive" />
                    </div>
                }
            </div>
        )
    }
}

const menu = [
    { name: 'Basic' },
    { name: 'Advance' },
]