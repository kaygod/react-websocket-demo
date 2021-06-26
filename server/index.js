const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });


wss.on('connection', function connection(ws) {

  console.log("新连接加入...");

  ws.on('message', function incoming(message) {  //接受客户端发来的消息
        if(typeof message === "string"){
            message = JSON.parse(message);
        }
        const { command } = message;
        if(command === "login"){ //登录
            message.data = {
                token:"123456789"
            }
            ws.send(serialize(message));
            Broadcast();
        }
  });

})

/**
 * 向所有客户端推送信息
 */
const Broadcast = async ()=>{
    
    await sleep(1000);

    const list = [{
        name:"火龙果",
        value:"8.00"
    },{
        name:"榴莲",
        value:"50.0"
    },{
        name:"芒果",
        value:"30.0"
    }]

    wss.clients.forEach(async function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            for(let i=0 ; i< list.length;i++){
                //发送一条数据
                client.send(serialize({
                    command:"home/add_item",
                    data:list[i]
                }));
                //显示提醒
                client.send(serialize({
                    command:"message_inform",
                    data:list[i]
                }));
                await sleep(1500);
            }
        }
    });
}

function serialize(ob){
    return JSON.stringify(ob);
}

function sleep(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(null)
        },time)
    })
}