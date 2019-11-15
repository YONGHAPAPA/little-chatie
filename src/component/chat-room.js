import React, {Component} from 'react';
import Api from '../api';
import RoomNoti from './chat-room.noti';
import { thisTypeAnnotation } from '@babel/types';


export default class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.onChangeMessageContent = this.onChangeMessageContent.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        this.state = {
            messageContent : '',
        };
    }

    componentDidMount(){
        this.connectChatRoom();
    }

    connectChatRoom(){
        const api = new Api();
        api.connectChatRoom(function(rcvData){
            console.log("connectChatRoom rcvMsg : " + rcvData.description);
        })
    }

    onChangeMessageContent(e){
        this.setState({
            messageContent : e.target.value
        });
    }

    onSendMessage(e){
        e.preventDefault();
        const api = new Api();
        console.log("send Message > " + this.state.messageContent);
        api.sendMessage(this.state.messageContent, function(rcvMsg){
            console.log("onSendMessage rcvMsg : " + rcvMsg);
        });

        //console.log("message > " + this.state.messageContent);
        this.setState({
            messageContent : '',
        })
        return false;
    }

    render(){
        return(
            <div>
                <p>######### ChatRoom #########</p>
                <form>
                    <div className="container">
                        <div className="form-group">
                            <RoomNoti connectTime={this.props.connectTime}/>
                        </div>
                        <div className="form-group">
                            <ul id="messages"></ul>
                        </div>
                        <div className="form-group" style={{display:'inline'}}>
                            <input style={{width:"250px"}} className="form-control" type="text" value={this.state.messageContent} onChange={this.onChangeMessageContent}/><button onClick={this.onSendMessage}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}