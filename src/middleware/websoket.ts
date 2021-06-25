const WebSocket = require('ws');
import { actionType } from '../redux/types';

const wsMiddleware = () => {
  let socket: any = {}; // 存储websocket连接

  /**
   * 连接成功了
   */
  const onOpen = (store: any) => {
    store.dispatch({
      type: 'UPDATE_GLOBAL_STATE',
      value: {
        type: 'connected',
        payload: true,
      },
    });
  };

  /**
   * 收到发送过来的消息
   */
  const onMessage = (store: any, data: any) => {
    store.dispatch({});
  };

  /**
   * 连接断开了
   */
  const onClose = (store: any) => {
    store.dispatch({
      type: 'UPDATE_GLOBAL_STATE',
      value: {
        type: 'connected',
        payload: false,
      },
    });
  };

  //返回中间件函数
  return (store: any) => (next: Function) => (action: actionType) => {
    switch (action.type) {
      // 建立连接
      case 'CONNECT_READY':
        let timer: null | NodeJS.Timeout = setInterval(() => {
          if (socket.readyState == 1 || socket.readyState == 2) {
            //已经连接成功了
            timer && clearInterval(timer);
            timer = null;
            return;
          }
          socket = new WebSocket('ws://www.host.com/path');
          socket.on('open', () => {
            onOpen(store);
          });
          socket.on('message', (data: any) => {
            onMessage(store, data);
          });
          socket.on('close', () => {
            onClose(store);
          });
        }, 1000);

        break;
      // 向后台推送消息
      case 'PUSH_MESSAGE':
        break;
      // 主动断开连接
      case 'DIS_CONNECT':
        break;
      default:
        next(action);
    }
  };
};

export default wsMiddleware();
