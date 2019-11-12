import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import {subscribeToTimer} from './api';
import { tsConstructorType } from '@babel/types';



class App extends Component {
   constructor(props){
    super(props);

    this.state = {
      timestamp : 'no timestamp yet.'
    }

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));

   }

   render(){
      return (
        <div className="App">
          <p className="App-intro">
            {this.state.timestamp}
          </p> 
        </div>
      );
    }
}

export default App;
