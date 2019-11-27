import React, {Component} from 'react';
import '../../style.css'


export default class Popup extends Component {
    render(){
        return(
            <div className='popup'>
                <div className='popup_inner'>
                    <h1>popup</h1>
                    <button onClick={this.props.closePopup}>close</button>
                </div>
            </div>
        );
    }
}