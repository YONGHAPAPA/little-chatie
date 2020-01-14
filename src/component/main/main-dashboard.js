import React, {Component} from 'react';

export default class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <div>&nbsp;</div>
                <h3>DashBoard</h3>
                <div className='dash_left_pane'>
                    <span>left</span>
                </div>
                <div className='dash_right_pane'>
                    <span>right</span>
                </div>
            </div>
        );
    }
}