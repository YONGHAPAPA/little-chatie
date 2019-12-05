import React, {Component} from 'react';
import '../../style.css'

export default class PopupSignin extends Component {

    constructor(props){
        super(props);

        this.state = {
            userInputEmail : props.inputUserEmail,
        }
    }

    onChangeInputUserEmail(e){
        this.setState({
            userInputEmail : e.target.value,
        });
    }

    onClickLogin(){
        this.props.processLogin(this.state.userInputEmail);
    }


    //주의 이방식으로는 props 로 접근이 안됨!?
    /* 
    clickLogin(){
        this.props.processLogin("ddddd");
    }
    */

   doLogin = () => {
        //여기서 submit 하고 사용자 정보 Parent로 리턴처리로..
        //this.props.processLogin("complete login...");
        console.log("toLogin...");
    }


    render(){
        return (<div className='popup'>
                    <div className='popup_inner'><label>mail address : </label>&nbsp;<input onChange={this.onChangeInputUserEmail.bind(this)} type="text" />
                    <button onClick={this.onClickLogin.bind(this)}>login</button><button onClick={this.props.closeLogin}>close</button></div>
                </div>)
    }
}