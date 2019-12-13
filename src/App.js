import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { tsConstructorType } from '@babel/types';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import mongodb from 'mongodb';


//import {subscribeToTimer} from './api';
import Api from './controller/api';
//import Com from './/lib/com';


import Chatroom from './component/chat/chat-room';
import PopupLogin from './component/main/popup-signin';
import Popup from './component/comm/comm-popup';
import Modal from './component/main/main-modal';
import Signin from './component/main/signin';
import Signup from './component/main/signup';
import Dashboard from './component/main/dashboard'
import TopMain from './component/main/top-main'

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";


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
      showModal : false, 
      user_mailAddress : '', 
      inputUserEmail : '',
      isLogin : false,
      userinfo : {}
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

     console.log(this.state.user_name);
   }

   onChangeUserName(e){
    this.setState({
      user_name : e.target.value
    });
   }

   processLogin(userInputEmail){
    let reqData = {useremail : userInputEmail};
    axios.get('http://localhost:8000/user/register').then(res => {
        //console.log("request result : " + res.data.result);
    }).catch(err => {console.log(err)});
   }

   getUserInfo = (userInfo) => {
    console.log("getUserInfo : " + userInfo);
   }

   doRegister = (inputData) => {
    axios.post('http://localhost:8000/user/register', inputData).then().catch(err => {console.log(err)});
   }



   /*
   getUserInfo(userInfo){
    console.log("getUserInfo : " + userInfo);
   }
   */

   
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

            <div className="menu_main_top_right">
              <Link to="/">home</Link>&nbsp;
              <Link to="/dashboard">dashboard</Link>&nbsp;
              <Link to="/signin">sign in</Link>&nbsp;
              <Link to="/signup">sign up</Link>
              
              {/*
                <span onClick={this.toggleModal.bind(this)}>Login</span>
                {this.state.showPopup ? <Popup closePopup={this.togglePopup.bind(this)}/> : null}
              */}
            </div>

            {/*
              <Modal show={this.state.showModal}><PopupLogin inputUserEmail={this.state.inputUserEmail} processLogin={this.processLogin.bind(this)} closeLogin={this.toggleModal.bind(this)}/></Modal>
            */}
          </div>

          
          {/*<Route path="/" render={(props) => <Chatroom {...props} connectTime={this.state.connect_time} room={this.state.selectedRoom} />}/>*/}

          <Route path="/" render={(props) => <TopMain {...props}/>} />
          <Route path="/dashboard" render={(props) => <Dashboard {...props}/>} />
          <Route path="/signin" render={(props)=><Signin {...props} />} />
          <Route path='/signup' render={(props)=><Signup {...props} doRegister={this.doRegister} />} />
        </Router>
      );
    }
}

export default App;
