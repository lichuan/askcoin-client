import elliptic from 'elliptic'
import {observable, action} from 'mobx';


const registerState = observable({
  step1:-1,
  step2:false,
  success: false,
   failure: false
});

const appState = observable({
  networkError: false,
  networkClose:false
});



var SingleConnect = (function () {
  //参数：传递给单例的一个参数集合

  const hash = require('hash.js');
  const EC = elliptic.ec
  const ec = new EC('secp256k1')
  var Buffer = require('buffer/').Buffer
  const ws = new WebSocket('ws://172.104.48.244:19050');

  function Singleton(args) {
    console.log('connect--->singleton')

    //设置args变量为接收的参数或者为空（如果没有提供的话）
    var args = args || {};

    ws.onopen = () => {
      // 打开一个连接
      console.log('connect--->open')
      // 发送探测消息
      ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:1}));

    };

    ws.onmessage = (e) => {
      // 接收消息
      const data = e.data
      const msg_type = data.msg_type ? data.msg_type: 0
      const msg_cmd = data.msg_type ? data.msg_type: 0
      const msg_id = data.msg_type ? data.msg_type: 0


      console.log('message---->',e.data)
      setTimeout(()=>{
        ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:1}));
      },10000)

      if(msg_type === 2){
        if(data.msg_id === 0){
          console.log('account-----0')
          registerState.step1 = 0
        }else {
          console.log('account-----1')
          registerState.step1 = 1

        }
      }
    };

    ws.onerror = (e) => {
      // 发生了一个错误
      console.log('error----->')
      appState.networkError = true
    };

    ws.onclose = (e) => {
      // 连接被关闭了
      console.log('close----->')
      appState.networkError = true
    };
  }

  function register(sign_key, avatar) {
    console.log('register---->')
    var sign_obj = JSON.parse(sign_key);
    ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:0}));
    var key_pair = ec.genKeyPair({entropy:'112699108505435943726051051450940377552177626778909564691673845134467691053980'});
    var privkey_hex = key_pair.getPrivate("hex");
    var privkey = ec.keyFromPrivate(privkey_hex, 'hex');
    var pubkey_hex = privkey.getPublic('hex');
    var pubkey = ec.keyFromPublic(pubkey_hex, 'hex');
    var privkey_b64 = Buffer.from(privkey_hex, 'hex').toString('base64');
    var pubkey_b64 = Buffer.from(pubkey_hex, 'hex').toString('base64');
    var data_obj = {};
    data_obj.type = 0;
    data_obj.pubkey = pubkey_b64;
    var utc = (Date.now() / 1000);
    data_obj.utc = parseInt(utc);
    data_obj.avatar = avatar;
    data_obj.sign = sign_obj.sign;
    data_obj.sign_data = sign_obj.sign_data;
    var tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
    var sign = privkey.sign(tx_hash_raw).toDER();
    var sign_b64 = Buffer.from(sign).toString('base64');
    var packet = {msg_type:2, msg_cmd:0, msg_id:1, sign:sign_b64, data:data_obj};
    ws.send(JSON.stringify(packet));
  }

  //实例容器
  var instance;



  var _static = {
    name: 'SingletonTester',


    getInstance: function (args) {
      if (instance === undefined) {
        instance = new Singleton(args);
      }
      return instance;
    },
    register: function (sign_key, avatar) {
    console.log('register---->')
    var sign_obj = JSON.parse(sign_key);
    ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:0}));
    var key_pair = ec.genKeyPair({entropy:'112699108505435943726051051450940377552177626778909564691673845134467691053980'});
    var privkey_hex = key_pair.getPrivate("hex");
    var privkey = ec.keyFromPrivate(privkey_hex, 'hex');
    var pubkey_hex = privkey.getPublic('hex');
    var pubkey = ec.keyFromPublic(pubkey_hex, 'hex');
    var privkey_b64 = Buffer.from(privkey_hex, 'hex').toString('base64');
    var pubkey_b64 = Buffer.from(pubkey_hex, 'hex').toString('base64');
    var data_obj = {};
    data_obj.type = 1;
    data_obj.pubkey = pubkey_b64;
    var utc = (Date.now() / 1000);
    data_obj.utc = parseInt(utc);
    data_obj.avatar = avatar;
    data_obj.sign = sign_obj.sign;
    data_obj.sign_data = sign_obj.sign_data;
    var tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
    var sign = privkey.sign(tx_hash_raw).toDER();
    var sign_b64 = Buffer.from(sign).toString('base64');
    var packet = {msg_type:2, msg_cmd:0, msg_id:1, sign:sign_b64, data:data_obj};
    ws.send(JSON.stringify(packet));
  }

  };
  return _static;
})();

export {SingleConnect, registerState, appState}