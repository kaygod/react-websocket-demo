const WS = window.require('ws');
import { actionType } from '../redux/types';
import { messageResolve } from './common';
import { v1 as uuid } from 'uuid';
const { Agent } = require('https');

const callback_list: { [prop: string]: any } = {};

export interface messageType {
  command: string;
  data: any;
  request_id?: string;
  resolve?: Function;
  reject?: Function;
}

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
  const onMessage = (store: any, response: messageType) => {
    if(typeof response === "string"){
      response = JSON.parse(response);
    }
    let action;
    if (response.request_id && (action = callback_list[response.request_id])) {
      // 该请求缓存过了
      action.resolve(response.data);
    }
    messageResolve(store, response);
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
  
  //定时器
  let timer : null | NodeJS.Timeout = null;

  //返回中间件函数
  return (store: any) => (next: Function) => (action: actionType) => {
    switch (action.type) {
      // 建立连接
      case 'CONNECT_READY':
        timer = setInterval(() => {
          if (socket != null && (socket.readyState == 1 || socket.readyState == 2)) {
            //已经连接成功了
            timer && clearInterval(timer);
            timer = null;
            return;
          }
          try {
            socket = new WS('ws://localhost:8080');   
          } catch (error) {
            console.log(error);
          }
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
        const { command, data } = action.value;
        const message = {
          command,
          data,
          request_id: uuid(),
        };
        if (action.resolve) {
          callback_list[message.request_id] = action;
        }
        socket.send(JSON.stringify(message)); // 推送消息
        break;
      // 主动断开连接
      case 'DIS_CONNECT':
        socket.close();
        onClose(store);
        break;
      default:
        next(action);
    }
  };
};

export default wsMiddleware();
