import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

//import {subscribeToTimer} from './api';
import Api from './controller/api';


import { tsConstructorType } from '@babel/types';

import Chatroom from './component/chat/chat-room';
import Login from './component/main/main-login';
import Popup from './component/comm/comm-popup';
import Modal from './component/main/main-modal';

import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
   constructor(props){
    super(props);

    //let date = new Date().getTime();
    this.state = {
      user_name : '',
      time_stamp : 'no timestamp yet.', 
      connect_time : new Date().getTime(),
      selectedRoom : '',
      showPopup : false, 
      showModal : false
    }
    
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.handleChangeRoom = this.handleChangeRoom.bind(this);
   }

   togglePopup(){
     this.setState({
       showPopup:!this.state.showPopup
     });
   }


   toggleModal(){
    this.setState({
       showModal : !this.state.showModal
     });
   }

   
   handleChangeRoom(e){
     this.setState({
      selectedRoom : e.target.value
     })
   }


   onChangeUserName(e){
    this.setState({
      user_name : e.target.value
    });
   }

   
   render(){
      return (
        <Router>
          <div className="container">

            {/*
              <p className="App-intro">
              {this.state.connect_time}
              {this.state.selectedRoom}
              </p> 

              <form>
                <div className="radio">
                  <label><input type="radio" value="room_1" checked={this.state.selectedRoom === 'room_1'} onChange={this.handleChangeRoom} />Room 1 </label>&nbsp;
                  <label><input type="radio" value="room_2" checked={this.state.selectedRoom === 'room_2'} onChange={this.handleChangeRoom} />Room 2 </label>&nbsp;
                  <label><input type="radio" value="room_3" checked={this.state.selectedRoom === 'room_3'} onChange={this.handleChangeRoom} />Room 3 </label>&nbsp;
                  <label><input type="radio" value="room_4" checked={this.state.selectedRoom === 'room_4'} onChange={this.handleChangeRoom} />Room 4 </label>&nbsp;
                </div>
              </form>
            */}
            

            {
              /*
              <div className="form-group">
                <input className="form-group" type="text" value={this.state.user_name} onChange={this.onChangeUserName} />
              </div>
              
              <div className="container">
              <Link to="/chatroom"># Chat Room</Link>
              </div>
              */
            }
            {/*
              <Route path="/" component={Chatroom}/>
            */}

            {/*
              <Chatroom connectTime={this.state.connect_time} room={this.state.selectedRoom} />
            */}
            

            {/* 
              <Route 
              path="/" 
              render={(props) => <Chatroom {...props} connectTime={this.state.connect_time} room={this.state.selectedRoom} />}
              />
            */}

            <div className="">
              <span onClick={this.toggleModal.bind(this)}>Login</span>
              {this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)}/> : null}
            </div>
            <Modal show={this.state.showModal}><Login closeLogin={this.toggleModal.bind(this)}/></Modal>
          </div>
        </Router>
      );
    }
}

export default App;
