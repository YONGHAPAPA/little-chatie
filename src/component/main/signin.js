import React, {Component} from 'react';
import '../../style/main.css';

export default class Signin extends Component {
    
    render(){
        return(
            <div className='center_block'>
                <div className='in_block'>
                    <h1>Sign in</h1>
                    <table className='center_block'>
                        <tbody>
                            <tr>
                                <td><label>email address</label></td>
                            </tr>
                            <tr>
                                <td><input type="text"/></td>
                            </tr>
                            <tr>
                                <td><label>password</label></td>
                            </tr>
                            <tr>
                                <td><input type="text"/></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td><button>login</button></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

