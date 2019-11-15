import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

//import {subscribeToTimer} from './api';
import Api from './api';

import { tsConstructorType } from '@babel/types';

import Chatroom from './component/chat-room';
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
   constructor(props){
    super(props);

    //let date = new Date().getTime();
    this.state = {
      user_name : '',
      time_stamp : 'no timestamp yet.', 
      connect_time : new Date().getTime(),
    }
    /*
    const api = new Api();
    api.subscribeToTimer((err, timestamp) => this.setState({
      time_stamp : timestamp
    }));
    */

    /*
    api.subscribeNotice(this.state.user_name,(notiMsg) => this.setState({
      room_noti : notiMsg
    }));
    */

    //api.subscribeNotice("zerobreaker", (notice) => console.log(notice));

    this.onChangeUserName = this.onChangeUserName.bind(this);
   }

   onChangeUserName(e){
    console.log(e.target.value);
    this.setState({
      user_name : e.target.value
    });
   }

   render(){
      return (
        <Router>
          <div className="container">
            <p className="App-intro">
              {this.state.connect_time}
            </p> 

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

            <Route 
              path="/" 
              render={(props) => <Chatroom {...props} connectTime={this.state.connect_time} />}
            />
          </div>
        </Router>
      );
    }
}

export default App;
