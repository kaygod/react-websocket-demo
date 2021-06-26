import { actionType } from '../types';

const defaultState = {
  connected: false, // 是否连接上
  token: '', // 请求后端数据的token
  is_login:false, // 已经登录了吗
  loading:false //页面是否显示加载中的样式
};

export default (state = defaultState, action: actionType) => {
  switch (action.type) {
    case 'UPDATE_GLOBAL_STATE':
      const { type, payload } = action.value;
      return { ...state, [type]: payload };
    case 'CONNECT_SUCCESS':
      return { ...state, connected: true };
    default:
      return state;
  }
};
