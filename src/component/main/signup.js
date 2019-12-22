import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import '../../style/main.css';

export default class Siginup extends Component {

    constructor(props){
        super(props);

        this.state ={
            isLogin : false,
            name : '', 
            email : '',
            password : ''
        }
    }

    
    onClickRegister = () => {
        let reqData = {
            name : this.state.name, 
            email : this.state.email,
            password : this.state.password
        }


        axios.post('http://localhost:8000/user/register', reqData).then(res => {
            let result = (res.data.result === "S") ? true : false;
            this.setState({
                isLogin : result,
            });

        }).catch(err => {console.log(err)});
        //this.props.doRegister(data);
    }

    onChangeName(e){
        this.setState({
            name : e.target.value,
        });
    }

    onChangeEmail(e){
        this.setState({
            email : e.target.value,
        })
    }

    onChangePassword(e){
        this.setState({
            password : e.target.value
        });
    }
    

    render(){
        return(
            <div>
                {this.state.isLogin && <Redirect to="/dashboard"/>}
                <div className='center_block'>
                    <div className='in_block'>
                        <h4>Sign up</h4>
                        <table className='login_table'>
                            <tbody>
                                <tr>
                                    <td><label>name&nbsp;</label><input type='text' onChange={this.onChangeName.bind(this)}/></td>
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
                                        <button onClick={this.onClickRegister}>Register</button>
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