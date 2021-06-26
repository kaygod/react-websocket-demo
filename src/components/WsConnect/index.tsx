import React, { ReactElement } from 'react';
import { useDispatch,useSelector } from "react-redux";

const WsConnect = (props:{children:ReactElement}) => {

    const dispatch = useDispatch();
    const { connected } = useSelector((state)=>state.global);
    
    //建立websocket连接
    if(!connected){
        dispatch({
            type:"CONNECT_READY"
        });
    }
    
    return (
        <div>
            {props.children}
        </div>
    );
}

export default WsConnect;
