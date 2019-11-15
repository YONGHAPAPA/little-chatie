import React, {Component} from 'react';
import Api from '../api';

const noti_connectTime = null;

export default class RoomNoti extends Component {
    constructor(props){
        super(props);
        //console.log(props.connectTime);
        const noti_connectTime2 = null;
    }

    render(){
        return(
            <div style={{display:'inline'}}>
                <span>NOTICE : Your connect time is </span><span style={{fontWeight:'bold'}}>{this.props.connectTime}</span>
            </div>
        );
    }
}

