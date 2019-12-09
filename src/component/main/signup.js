import React, {Component} from 'react';

import '../../style/main.css';

export default class Siginup extends Component {

    constructor(props){
        super(props);

        this.state ={
            username : '', 
            email : '',
            password : ''
        }
    }

    
    onClickRegister = () => {
        let data = {
            username : this.state.username, 
            email : this.state.email,
            password : this.state.password
        }

        this.props.doRegister(data);
    }

    onChangeUserName(e){
        this.setState({
            username : e.target.value,
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
            <div className='center_block'>
                <div className='in_block'>
                    <h4>Sign up</h4>
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
                                    <button onClick={this.onClickRegister}>Register</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}