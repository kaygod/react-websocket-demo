import { messageType } from './websoket';

/**
 *  消息处理
 */
export const messageResolve = (store: any, response: messageType) => {
  //将推送的消息广播全局,因为可能某些页面需要监听消息
  store.dispatch({
    type: 'MESSAGE_INCOMMING',
    value: response,
  });
  //公共功能的开发
  switch (response.command) {
    //消息通知,需要弹框提醒通知的消息
    case 'message_inform':
      alert(response.data.content);
      break;
    //版本升级
    case 'software_upgrading':
      break;
  }
};
