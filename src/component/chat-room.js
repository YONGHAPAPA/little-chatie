import React, {Component} from 'react';
import Api from '../api';
import RoomNoti from './chat-room.noti';
import { thisTypeAnnotation } from '@babel/types';


export default class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.onChangeSentMessage = this.onChangeSentMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        //this.listenningMessage = this.listenningMessage.bind(this);
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this);
        this.state = {
            sentMsg : '',
            msglist : [],
        };
    }

    componentDidMount(){
        this.connectChatRoom();
    }

    handleReceivedMessage(receivedData){
        const msglist = this.state.msglist;
        const newMsgList = [...msglist, receivedData];
        
        this.setState({
            msglist : newMsgList,
        });

        console.log(this.state.msglist);
    }

    connectChatRoom(){
        const api = new Api();
        api.connectChatRoom(this.handleReceivedMessage)
    }

    onChangeSentMessage(e){
        this.setState({
            sentMsg : e.target.value
        });
    }

    onSendMessage(e){
        e.preventDefault();
        const api = new Api();
        console.log("send Message > " + this.state.sentMsg);
        api.sendMessage(this.state.sentMsg, function(rcvData){
            //console.log("onSendMessage rcvMsg : " + rcvMsg);
            this.appendMessage(rcvData);
        });

        //console.log("message > " + this.state.messageContent);
        this.setState({
            sentMsg : '',
        })
        return false;
    }

    render(){

        const messageList = this.state.msglist;

        return(
            <div>
                <p>######### ChatRoom #########</p>
                <form>
                    <div className="container">
                        <div className="form-group">
                            <RoomNoti connectTime={this.props.connectTime}/>
                        </div>
                        <div className="form-group">
                            <ul>{
                                messageList.map(function(item, i)
                                {
                                    return <li key={i}>{item}</li>
                                })
                                }</ul>
                            
                        </div>
                        <div className="form-group" style={{display:'inline'}}>
                            <input style={{width:"250px"}} className="form-control" type="text" value={this.state.sentMsg} onChange={this.onChangeSentMessage}/><button onClick={this.onSendMessage}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}