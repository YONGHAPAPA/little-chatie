import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';

import '../../style/main.css';

export default class Signin extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLogin : false, 
            name : '', 
            email : '', 
            password : '',
        }
    }

    onChangeUserName(e){
        this.setState({
            name : e.target.value
        });
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value
        });
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }

    onClickCheckSession = () => {
        const url = "http://localhost:8000/user/login/checkSession";
        
        axios.get(url).then(res => {
            console.log(res.data.users)
        });
    }

    onClickLogout = () => {
        const url = "http://localhost:8000/user/logout";

        axios.get(url).then(res => {
            console.log(res.data.users)
        });
    }

    onClickLogin = () => {

        const post_url = "http://localhost:8000/user/login";

        let reqData = {
            name : this.state.name, 
            email : this.state.email, 
            password : this.state.password
        }

        axios.post(post_url, reqData).then(res => {
            let result = (res.data.result === "S") ? true : false;

            this.setState({
                isLogin : result,
            });

            if(!result){
                alert("login fail.");
            }
        }).catch(err => {console.log(err)})
    }

    onClick_foo = () => {
        console.log("onClick_foo");
        const url = "http://localhost:8000/foo";

        /*
        axios.get(url).then(res => {
            console.log(res.data.users)
        });
        */
       
    }

    onClick_bar = () => {
        console.log("onClick_bar");
        const url = "http://localhost:8000/bar";

        axios.get(url).then(res => {
            console.log(res.data.users)
        });
    }
    
    render(){
        return(
            <div>
                {this.state.isLogin && <Redirect to="/dashboard"/>}
                <div className='center_block'>
                    <div className='in_block'>
                        <h4>Sign in</h4>
                        <table className='login_table'>
                            <tbody>
                                <tr>
                                    <td><label>username&nbsp;</label><input type='text' onChange={this.onChangeUserName.bind(this)}/></td>
                                </tr>
                                <tr>
                                    <td><label>email&nbsp;</label><input type='text' onChange={this.onChangeEmail.bind(this)}/></td>
                                </tr>
                                <tr>
                                    <td><label>password&nbsp;</label><input type='password' onChange={this.onChangePassword.bind(this)}/></td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>
                                        <button onClick={this.onClickLogin}>Login</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button onClick={this.onClickCheckSession}>check session</button>
                                        <button onClick={this.onClickLogout}>log out</button>

                                        <button onClick={this.onClick_foo}>foo</button>
                                        <button onClick={this.onClick_bar}>bar</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

