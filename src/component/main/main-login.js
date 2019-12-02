import React, {Component} from 'react';
import DataAccess from '../../controller/data-access'
import '../../style.css'





export default class Login extends Component {

    constructor(props){
        super(props);
    }


    //주의 이방식으로는 props 로 접근이 안됨!?
    /* 
    clickLogin(){
        this.props.processLogin("ddddd");
    }
    */

   doLogin = () => {
        //여기서 submit 하고 사용자 정보 Parent로 리턴처리로..
        var da = new DataAccess();
        da.openDbConnection();

        
        
        this.props.processLogin("complete login...");
    }



    render(){
        return (<div className='popup'>
                    <div className='popup_inner'><label>mail address : </label>&nbsp;<input type="text" />
                    <button onClick={this.doLogin}>login</button><button onClick={this.props.closeLogin}>close</button></div>
                </div>)
    }
}