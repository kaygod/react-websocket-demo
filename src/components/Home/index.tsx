import React from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/login";
import { useHistory } from "react-router-dom";

const StyledWrapper  = styled.div`
.ant-list-items {
    width:80%;
    margin: 0px auto;
    margin-top:150px;
    padding: 0;
    list-style: none;
    position: relative;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    background-color: #fff;
    .item{
      border-bottom: 1px solid #f0f0f0;
      display: block;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      color: #000000d9;
      .ant-typography {
        color: #000000d9;
        overflow-wrap: break-word;
     }
     &.mid{
      text-align: center;
      color:#333;
      font-weight: 700;
     }
     .catagory{
       display: flex;
       justify-content: space-between;
     }
    }
}
.logout{
  position: absolute;
  right:30px;
  top:20px;
  color:#005aa0;
}
`;


export default function Home() {

  const { list } = useSelector(state => state.home);

  const dispatch = useDispatch();

  const history = useHistory();

  const Logout = async ()=>{
    await dispatch(logoutAction());
    history.replace("/login");
  }

  return (<StyledWrapper>
          <p className="logout" onClick={Logout}>Logout</p>   
          <ul className="ant-list-items">
            <li className="item mid"><span className="ant-typography"></span> 列表数据</li>
            {
              list.map((item,index)=>{
                return (
                  <li className="item" key={index}><p className="catagory"><span>名称: {item.name}</span>  <span>价格:{item.value}元</span></p></li>
                )
              })
            }
          </ul>
      </StyledWrapper>)
}
