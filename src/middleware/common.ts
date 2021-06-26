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
    case 'message_inform': //消息通知,可以用弹框提醒
      console.log(`后端推送一条通知:${JSON.stringify(response.data)}`);
      break;
    case 'software_upgrading'://版本升级
      console.log("触发版本升级的窗口");
      break;
  }
};
