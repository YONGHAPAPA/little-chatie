import React, {Component} from 'react';

import '../../style/main.css';

export default class Siginup extends Component {

    constructor(props){
        super(props);
    }

    
    onClickRegister = () => {
        let data = {
            id : 'zerobreaker@gmail.com', 
            email : 'zerobreaker@gmail.com',
            pwd : '1234'
        }

        this.props.doRegister(data);
    }
    

    render(){
        return(
            <div className='center_block'>
                <div className='in_block'>
                    <h1>Sign up</h1>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>email address</label></td>
                            </tr>
                            <tr>
                                <td><input type='text'/></td>
                            </tr>
                            <tr>
                                <td><label>password</label></td>
                            </tr>
                            <tr>
                                <td><input type='text' /></td>
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