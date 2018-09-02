import React, { Component } from 'react'
import Group from './Group';
import {base} from '../../base';
import { Link } from 'react-router-dom';

export default class Groups extends Component {
    constructor () {
        super();
        this.state = {
            groups: []
        };
        this.getSingleGroup = this.getSingleGroup.bind(this);
    }

    componentWillMount () {
        this.groupsRef = base.syncState('groups', {
            context: this,
            state: 'groups',
            asArray: true,
            queries: {
                //limitToFirst: 4
            },
            then(){
                base.removeBinding(this.groupsRef);
            }
        });
    }

    /*componentDidMount () {
        this.getSingleGroup("27c4b916-f568-46a6-8247-9cd819e0c43b")
    }*/

    getSingleGroup (id) {
        base.fetch('groups', {
            queries: {
                orderByKey: true,
                equalTo: id
            },
            then(data){
                console.log(data[id]);
            }
        });
    }

    deleteGroup = (id) => {
        const {groups} = this.state;
        const newGroups = groups.filter((group) => {return group.key !== id });
        this.setState({groups: newGroups});
    }
    
    render() {
        const {groups} = this.state;
        const groupsRender = groups[0] ? groups.map((group, index)=> {
            return (<Group deleteClickHandler={this.deleteGroup.bind(this, group.key)} key={index} group={group}/>)
        }) : []
        return (
            <div className="container">
                <Link className="btn btn-info mb-3 pull-right" to='create_group'> Add </Link>
                {groupsRender}
            </div>
        )
    }
}
