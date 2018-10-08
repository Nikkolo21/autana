import React, { Component } from 'react'
import Atom from './Atom';
import {base} from '../../base';
import { Link } from 'react-router-dom';

export default class Atoms extends Component {
    constructor () {
        super();
        this.state = {
            atoms: []
        };
    }

    componentWillMount () {
        this.projectsRef = base.syncState(`users/${this.props.uid}/atoms`, {
            context: this,
            state: 'atoms',
            asArray: true,
            queries: {
                //limitToFirst: 4
            },
            then(){
                //base.removeBinding(this.projectsRef);
            }
        });
    }
    
    render() {
        const {atoms} = this.state;
        const atomsRender = atoms[0] ? atoms.map((atom, index)=> {
            return (<Atom uid={this.props.uid} key={index} atom={atom}/>)
        }) : false
        return (
            <div className="container">
                <p className="text-right my-4"><Link to='create_atom'> Add Atom </Link></p>
                <div className="mt-3">
                    { atomsRender ? atomsRender : (<h5 className="text-center mt-5"> UPS! Seems you have not atoms yet</h5>) }
                </div>
            </div>
        )
    }
}
