import { actionType } from "../types";

/**
 *  loading 决定本次请求需不需要让页面出现加载中的样式 
 */
export const fetch = ({dispatch,action,loading = false}:{dispatch:Function,action:actionType,loading?:boolean}) =>{
    loading && openLoading(dispatch); // 加载中
    return new Promise((resolve,reject)=>{
        action.resolve = resolve;
        action.reject = reject;
        dispatch(action);    
    }).finally(()=>{ // 异步请求完成后关闭loading
        closeLoading(dispatch);
    })
}

//修改全局reducers/global.ts定义的loading状态 
const openLoading = (dispatch:Function)=>{
   dispatch({
       type:"UPDATE_GLOBAL_STATE",
       value:{
           type:"loading",
           value:true
       }
   })
}

const closeLoading = (dispatch:Function)=>{
    dispatch({
        type:"UPDATE_GLOBAL_STATE",
        value:{
            type:"loading",
            value:false
        }
    })
}