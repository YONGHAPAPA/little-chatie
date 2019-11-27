import React, {Component} from 'react';
import Api from '../../controller/api';

const noti_connectTime = null;

export default class RoomNoti extends Component {
    constructor(props){
        super(props);
        //console.log(props.connectTime);
        const noti_connectTime2 = null;
    }

    /*
    componentWillReceiveProps(nextProps){
        console.log("chat-room : " + nextProps.message);
    }
    */

    render(){
        return(
            <div style={{display:'block'}}>
                
                {/*
                    <div><span>Your connect time is </span><span style={{fontWeight:'bold'}}>{this.props.connectTime}</span></div>
                */}
                
                <div><span>* Connected Room : </span><span style={{fontWeight:'bold'}}>{this.props.message}</span></div>
            </div>
        );
    }
}

