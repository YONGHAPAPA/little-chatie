import React, {Component} from 'react';
import Api from '../api';
import RoomNoti from './chat-room.noti';
import { thisTypeAnnotation } from '@babel/types';


export default class ChatRoom extends Component {
    constructor(props){
        super(props);
        this.onChangeInputMessage = this.onChangeInputMessage.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
        //this.listenningMessage = this.listenningMessage.bind(this);
        this.handleReceivedMessage = this.handleReceivedMessage.bind(this);

        this.state = {
            room : props.room,
            msglist : [],
            message : ''
        };
    }

    
    componentWillReceiveProps(nextProps){
        //console.log("componentWillReceiveProps : " + nextProps.room);
        this.setState({
            room : nextProps.room
        })
    }

    /*
    shouldComponentUpdate(nextProps, nextState){
        return this.props.room !== nextProps.room;    
    }

    componentWillUpdate(nextProps, nextState){
        //console.log("componentWillUpdate : " + this.props.room);
    }
    */

    componentDidUpdate(prevProps, prevState){
        //console.log("componentDidUpdate : " + this.props.room);
        //console.log("componentDidUpdate : " + this.state.room);
        //체크로직이 없으면 message textbox 가 입력될때마다 페이지가 초기화 되서 textbox 값이 공백이 됨.
        if(prevProps.room !== this.props.room){
            this.connectChatRoom();
        }
    }
    
    componentDidMount(){
        //console.log("componentDidMount : " + this.props.room);
    }


    handleReceivedMessage(res){
        const message = res.message;
        const newMsgList = [...this.state.msglist, message];
        
        this.setState({
            msglist : newMsgList,
        });
    }

    connectChatRoom(){
        const api = new Api();
        api.connectChatRoom({room:this.state.room}, function(res){
            console.log("connectChatRoom res : " + res.message)
        })
    }

    onChangeInputMessage(e){ 
        this.setState({
            message : e.target.value
        });
    }

    onSendMessage(e){
        e.preventDefault();

        console.log(this.state.room)
        const api = new Api();

        console.log("onSendMessage > " + this.state.message);
        api.sendMessage({room:this.state.room, message:this.state.message}, this.handleReceivedMessage);

        this.setState({
            message : ''
        })
    }

    render(){

        const messageList = this.state.msglist;

        return(
            <div>
                <p>######### ChatRoom #########</p>
                <form>
                    <div className="container">
                        <div className="form-group">
                            <RoomNoti connectTime={this.props.connectTime} />
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
                            <input style={{width:"250px"}} id="message" className="form-control" type="text" value={this.state.message} onChange={this.onChangeInputMessage} /><button onClick={this.onSendMessage}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}