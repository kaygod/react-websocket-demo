import { actionType } from '../types';
const defaultState = {
  connected: false, // 是否连接上
  token: '', // 请求后端数据的token
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
