import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { LoginAction } from "../../redux/actions/login"; 
import { useHistory } from "react-router-dom";


const StyledWrapper  = styled.div`
.login{
    border: 1px solid #E3E3E3;
    border-radius: 5px;
    padding: 38px 24px 18px 24px;
    width: 344px;
    font-size: 14px;
    color: #333;
    height: 324px;
    margin:45px auto;
    .pl5 {
    padding-left: 5px;
    color:#333;
    }
    .top10 {
      margin-top: 10px;
    }
    .login_input {
      padding-right: 52px;
      border: 1px solid #D6D6D6;
      height: 44px;
      padding-left: 5px;
      background-color: #fff;
      box-sizing: border-box;
      &>input {
            border: none;
            outline: none;
            height: 100%;
            line-height: 44px;
            width: 288px;
            font-size: 15px;
            background-color: #fff;
        }
    }
    .login_button{
      background-color: #146eb4;
      color: #fff;
      font-size: 18px;
      width: 345px;
      height: 48px;
      border: none;
      margin-top:20px;
      outline: none;
    }
}
`;

export default function Login() {

  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = (type:string,data:string)=>{
    dispatch({
      type:"UPDATE_INPUT",
      value:{
        type,
        data
      }
    });
  }

  const login = ()=>{
    dispatch(LoginAction()).then(()=>{
      console.log("登录成功!");
      history.push("/home");
    })
  }

  return (
      <StyledWrapper>
          <div className="login">
            <ul>
              <li className="pl5">登录账号:</li>
              <li className="top10">
                  <div className="login_input"><input onChange={(e)=>{onChange('username',e.target.value)}} type="text" placeholder="请输入账号" /></div>
              </li>
              <li className="pl5 top10">登录密码:</li>
              <li className="top10">
                  <div className="login_input"><input onChange={(e)=>{onChange('password',e.target.value)}} type="text" placeholder="请输入密码" /></div>
              </li>
            </ul>
            <button className="login_button" onClick={login}>立即登录</button>
          </div>  
      </StyledWrapper>
  )
}
