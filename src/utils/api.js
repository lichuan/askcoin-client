const hash = require('hash.js');
//const EC = require('elliptic').ec;
//const ec = new EC('secp256k1');
//const WebSocket = require('ws');
import elliptic from 'elliptic'
const EC = elliptic.ec
const ec = new EC('secp256k1')
var Buffer = require('buffer/').Buffer

//const ws = new WebSocket('ws://172.104.48.244:19050');

const  errorws = new WebSocket('ws://172.104.11.234:23445')

const register = (onError,onClose)=>{
  const ws = new WebSocket('ws://node1.askcoin.me:19050');

  let ping_timer;
  ws.onopen = () => {
    // 打开一个连接
    console.log('connect--->')
     ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:1}));
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
    data_obj.avatar = 3;
    var sign_str = '{"sign":"MEQCIA5P0pMAUByiGuMIkSOgOYTxAnT36t8zH0HxgTtZLI3BAiBXoWVtiH1c5VxKR1ujmIBjt51wpWCerXLzQMKRt79hnA==","sign_data":{"block_id":664,"fee":2,"name":"c2t5Zm9y","referrer":"BCf32BSqhVpDy04kIpC59IT16yp77oAJnEBeRJZWc7I8JtYd2HlCtUJPPKSA4yea7dyWowXpGbaRpKoGD9Wy0mk="}}';
    var sign_obj = JSON.parse(sign_str);
    data_obj.sign = sign_obj.sign;
    data_obj.sign_data = sign_obj.sign_data;
    var tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
    var sign = privkey.sign(tx_hash_raw).toDER();
    var sign_b64 = Buffer.from(sign).toString('base64');
    var packet = {msg_type:2, msg_cmd:0, msg_id:1, sign:sign_b64, data:data_obj};
    console.log(JSON.stringify(packet));
    ws.send(JSON.stringify(packet));
  };


  ws.onmessage = (e) => {
    // 接收到了一个消息
    console.log('message---->',e.data)

   //ws.send(JSON.stringify({msg_type:0, msg_cmd:2, msg_id:100}));

    setTimeout(()=>{
      ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:1}));
    },10000)
  };

  ws.onerror = (e) => {
    // 发生了一个错误
    onError()
  };

  ws.onclose = (e) => {
    // 连接被关闭了
    onClose()
  };

  // send ping packet
  //ping_timer = setInterval(function() {
   /* ws.send(JSON.stringify({msg_type:0, msg_cmd:0, msg_id:1}));
  }, 5000);*/

  // get info from server
  //ws.send(JSON.stringify({msg_type:0, msg_cmd:2, msg_id:100}));

  // register account, need generate privkey
  /*var key_pair = ec.genKeyPair();
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
  data_obj.avatar = 3;
  var sign_str = '{"sign":"MEUCIQCyU/J+rqjF6ZxTyZ7ZgmQ5hC/F4hEA0mtWGbzjZHFBBgIgfjA9stVN7MhI3esIZJ3mPHwcjgrZThNmPshLv5UnfVQ=","sign_data":{"block_id":1405,"fee":2,"name":"YWNjb3VudF8x","referrer":"BKBWkg5g5H0YBSqT1U0/aT/s1czat6SObFafhbpbsgvY9SO4k81Ay9jkq3zKRkXwSAA4BNmu8T+GjuUnXM4raLU="}}';
  var sign_obj = JSON.parse(sign_str);
  data_obj.sign = sign_obj.sign;
  data_obj.sign_data = sign_obj.sign_data;
  var tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  var sign = privkey.sign(tx_hash_raw).toDER();
  var sign_b64 = Buffer.from(sign).toString('base64');
  var packet = {msg_type:2, msg_cmd:0, msg_id:1, sign:sign_b64, data:data_obj};
  console.log(JSON.stringify(packet));
  ws.send(JSON.stringify(packet));*/

}

export {register}