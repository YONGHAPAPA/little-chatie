import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';

import '../../style/main.css';

export default class Signin extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLogin : false, 
            username : '', 
            email : '', 
            password : '',
        }
    }

    onChangeUserName(e){
        this.setState({
            username : e.target.value
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

    onClickLogin = () => {

        const post_url = "http://localhost:8000/user/login";

        let reqData = {
            username : this.state.username, 
            email : this.state.email, 
            password : this.state.password
        }

        axios.post(post_url, reqData).then(res => {

            console.log(res.data);
            
            let result = (res.data.result === "S") ? true : false;
            this.setState({
                isLogin : result,
            });
        }).catch(err => {console.log(err)})
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
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

