import { fetch } from "./global";

const loginType = (username:string,password:string)=>{
    return {
        type:"PUSH_MESSAGE",
        value:{
            command:"login",
            data:{
                username,
                password
            }
        }
    }
}

const updateGlobalType = (type:string,value:string | boolean)=>{
    return {
        type:"UPDATE_GLOBAL_STATE",
        value:{
            type,
            value
        }
    }
}

export const LoginAction = ()=>(dispatch:Function,getState:Function)=>{
    const { username,password } = getState().login;
    return fetch({
        dispatch,
        action:loginType(username,password)
    }).then((response:any)=>{
        dispatch(updateGlobalType("token",response.token)); // 存储token值
        dispatch(updateGlobalType("is_login",true)); //将全局状态is_login置为true
    })
}

export const logoutAction = ()=>(dispatch:Function)=>{
    dispatch(updateGlobalType("token","")); // 存储token值
    dispatch(updateGlobalType("is_login",false));
    return Promise.resolve(null);
}