import { actionType } from '../types';
const defaultState = {
  list: [],
};

export default (state = defaultState, action: actionType) => {
  switch (action.type) {
    case 'MESSAGE_INCOMMING': //监听后端推送过来的消息
      if(action.value.command === "home/add_item"){ // 添加一条数据
        return {...state,list:[...state.list,action.value.data]};
      }
      return state;
      break;
    default:
      return state;
  }
};
