import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';

import CONFIG_DB from '../../config/db';
import CONFIG_URL from '../../config/url';
import CONFIG_BASE from '../../config/base'

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
        axios.get(CONFIG_URL.REST_CHECK_SESSION, {withCredentials:true}).then(res => {
            console.log(res.data.users)
        });
    }

    onClickLogout = () => {
        axios.get(CONFIG_URL.REST_LOGOUT).then(res => {
            console.log(res.data.users)
        });
    }

    onClickLogin = () => {

        let reqData = {
            name : this.state.name, 
            email : this.state.email, 
            password : this.state.password
        }

        //withCredentials 옵션을 주면 각개의 Reqeust별 Session Share 가능.(header값에 Access-Control-Allow-Credentials를 true 로 하는 옵션)
        axios.post(CONFIG_URL.REST_LOGIN, reqData, {withCredentials:true}).then(res => {
            let result = (res.data.result === CONFIG_BASE.SUCCESS_FLAG) ? true : false;

            this.setState({
                isLogin : result,
            });

            if(!result){
                alert("login fail.");
            }
        }).catch(err => {console.log(err)})



        /*
        const postdata = {
            method:"POST", 
            headers:{
                'Accept':'application/json', 
                'Content-Type':'application/json', 
                'Cache':'no-cache'
            }, 
            //credentials 옵션을 설정함으로서 다른 URL 간의 쿠키, 세션정보를 공유할수 있도록 처리(include: Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls. )
            credentials:'include',
            body:JSON.stringify({name:'test', email:'test@gmail.com'})
        }

        fetch(url, postdata).then((res) => res.json()).then((resJson) => {
            console.log(resJson);
        }).catch(err => {
            console.log(err);
        })
        */
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

