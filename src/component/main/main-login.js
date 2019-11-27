import React, {Component} from 'react';
import '../../style.css'


export default class Login extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return (<div className='popup'>
                    <div className='popup_inner'><label>mail</label>&nbsp;<input type="text" />
                    <button>login</button><button onClick={this.props.closeLogin}>close</button></div>
                </div>)
    }
}