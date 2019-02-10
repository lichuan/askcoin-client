import '../../shim'
import {BackHandler, ToastAndroid} from 'react-native'
import {I18n} from '../language/I18n'

const EC = require('elliptic').ec;
const ec = new EC('secp256k1')
import {observable} from 'mobx';
import ApiSwitch from "../pages/advanced/ApiSwitch";

const hash = require('hash.js');
const Buffer = require('buffer/').Buffer;

import {addTopic, getTopic, deleteTopic, addReply, getReply, deleteReplyByTopicKey, deleteReply} from '../utils/db'
import LanguageSwitch from "../pages/login/LanguageSwitch";
import {strlen} from "../utils/common";
import {NavigationActions} from 'react-navigation'

//store
import TopicStore from '../stores/topic';
import UserStore from '../stores/user';
import AppStore from '../stores/app';


var SharedPreferences = require('react-native-shared-preferences');


let router = null;
let nav = null;

let tem_pub_key = '';
let tem_pri_key = '';

let temimpprivkey = '';

let app;

let pingTimer;

let toastTimer;

let loadTimer;

let questionTimer;

let questionProbeTimer;

let top100Timer;

let historyTimer;

let answerProbeTimer;


let replyProbeTimer;

let apiSaved = {api: ''};


SharedPreferences.getItem('APIADDRESS', res => {
  if (res === null) {
    appState.api = 'ws://node2.askcoin.me:19050';
    apiSaved.api = 'ws://node2.askcoin.me:19050'
  } else {
    appState.api = res;
    apiSaved.api = res;
  }
});


function initNav(_nav) {
  nav = _nav
}

function initRouter(_router) {
  router = _router
}

function compare(property) {
  return function (a, b) {
    const value1 = a[property];
    const value2 = b[property];
    return value2 - value1;
  };
}


const appState = observable({
  privkeyhex: '',
  pubkeyhex: '',
  fee: 0,
  blockID: 0,
  blockHash: '',
  errorCode: 0,
  loginStatus: '-1',
  laned: false,
  autoImport: false,
  connError: false,
  appClose: false,
  switchAPI: false,
  autoSwitchAPI: false,
  api: '',
  localStartTime: 0,
  localEndTime: 0,
  utc: 0,
  switchAPITip: false,
  curAPI: '',
  apiPage: false,
  mode: 0,
  apiIndex: 0,
  toast: true,

  testPub: '',
  testPri: '',
  detailType: 0,

  loadMode: 0,

  questionProbe: 0,

  questionType: 0,
  questionProbeCount: 0,
  replyMode: 0,
  replyProbeCount: 0,
  apiSaved: '',
  toDetail: 0,
  apiName: '',
  version: 0
});


const Topic = observable({
  topics: [],
  questions: [],
  answers: [],
  selectTopic: {},
  selectQuestion: {},
  selectAnswer: {},
  replies: [],
  selectReply: {},
  allReplies: []
});

const History = observable({
  histories: []
});

const Top100List = observable({
  top100: []
});

let ws = null;


function initNetwork(_app, api) {
try {
  app = _app;
  if (ws === null || ws.readyState === 3) {
    /*ws = new WebSocket(api ? api : apiSaved.api);*/
    ws = new WebSocket('ws://80.85.84.155:29050')
    console.log('tag--------------------->')
    appState.api = api ? api : apiSaved.api;
  }
  if (ws.readyState === 1) {
    return
  }

  ws.onopen = () => {
    // 打开一个连接
    loadSYSInfo();
    try {
      ws.readyState === 1 && ws.send(JSON.stringify({msg_type: 0, msg_cmd: 0, msg_id: 1}));
    } catch (error) {
    }
    app.setState({loading: false});
    appState.appClose = false;
    app.setState({connectError: false, loading: false}, () => {
      if (appState.mode === 1) {
        toast(I18n.t('connSuccess'));
        appState.mode = 0
      }

    });
    if (appState.switchAPITip && !appState.connError) {
      appState.switchAPITip = false
    }
    if (appState.loginStatus === '1') {
      appState.autoImport = true;
      const privb64 = Buffer.from(appState.privkeyhex, 'hex').toString('base64');
      importPriKey(undefined, privb64);
      return
    } else {
      app.setState({showLoading: false});
    }
    appState.errorCode = 0;
    // 发送探测消息

    loadPrivkey();
  };

  ws.onmessage = (e) => {
    // 接收消息
    const data = JSON.parse(e.data)

    const msg_type = data.msg_type;
    const msg_cmd = data.msg_cmd;
    const msg_id = data.msg_id;
    const err_code = data.err_code;

    if (err_code) {
      switch (err_code) {
        case 1:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode1')})
          break;
        case 10:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode10')})
          break;
        case 2:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode2')});
          break;
        case 3:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode3')});
          break;
        case 4:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode4')});
          break;
        case 6:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode6')});
          break;
        case 7:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode7')});
          break;
        case 8:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode8')});
          break;
        case 9:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode9')});
          break;
        case 11:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode11')});
          break;
        case 12:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode12')});
          break;
        case 13:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode13')});
          break;
        case 14:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode14')});
          break;
        case 15:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode15')});
          break;
        case 16:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode16')});
          break;
        case 17:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode17')});
          break;
        case 18:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode18')});
          break;
        case 19:
          app.setState({loading: false, error: true, errorContent: I18n.t('errCode19')});
          break;
        case 5:
          //探测返回消息
          app.setState({loading: true, loadingContent: I18n.t('waitPack')});
          setTimeout(() => {
            sendTestSign();
          }, 1000);
          break;
        default:
          app.setState({error: true, errorContent: I18n.t('errCode4')});
      }
      return;
    }


    if (msg_type === 0 && msg_cmd === 2 && msg_id === 0) {
      appState.version = data.version
      appState.localEndTime = parseInt(Date.now() / 1000);
      const utc = data.utc + (appState.localEndTime - appState.localStartTime) / 2 - appState.localEndTime;
      AppStore.handleUTC(utc);
      SharedPreferences.setItem('version', data.version.toString());
      testSign();
    }

    if (msg_type === 0 && msg_cmd === 1) {
      //ping消息
      pingTimer = setTimeout(() => {
        try {
          ws.readyState === 1 && ws.send(JSON.stringify({msg_type: 0, msg_cmd: 0, msg_id: 1}));
        } catch (error) {

        }
      }, 10000)
    }


    if (msg_type === 1) {

      if (msg_cmd === 0) {

        if (msg_id === 0) {
          //import success
          transferHistory();
          loadTop100();
          app.setState({connectError: false})
          SharedPreferences.setItem('app_is_auto_login', '1');
          appState.loginStatus = '1';
          appState.blockID = data.block_id;
          appState.blockHash = data.block_hash;
          UserStore.handleAvatar(data.avatar)
          UserStore.handleName(Buffer.from(data.name).toString());
          UserStore.handleID(data.id);
          UserStore.handleBalance(data.balance);
          SharedPreferences.setItem('privkeyhex', temimpprivkey);

          const topics = data.topics;

          const questions = data.questions;

          const answers = data.answers;


          questions.forEach((item) => {
            handleTopicsData(1, item)
          });

          answers.forEach((item) => {
            handleTopicsData(2, item)
          });

          topics.forEach((item) => {
            handleTopicsData(0, item)
          });
          setTimeout(() => {
            loadAnswers();
            if (TopicStore.questions.slice().length === 0) {
              appState.questionType = 0
            } else {
              appState.questionType = 1
            }
            probeQuestion();
          }, 5000);

          appState.privkeyhex = temimpprivkey;
          app.setState({loading: false, loadingContent: ''});
          router.setState({reStore: false});
          if (!app.state.imported) {
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Tabs'})//要跳转到的页面名字
              ]
            });
            router.props.navigation && router.props.navigation.dispatch(resetAction);
            app.setState({imported: true})
          }
          app.setState({showLoading: false}, () => {
          });
        }
      } else if (msg_cmd === 1) {
        //top100 111
        Top100List.top100 = data.top100;
        top100Timer = setTimeout(()=>{
          loadTop100();
          top100Timer && clearTimeout(top100Timer)
        },10000)
      } else if (msg_cmd === 2) {
        if (msg_id === 0) {
          SharedPreferences.setItem('app_is_auto_login', '0')
          SharedPreferences.setItem('probe', '1');
          app.setState({loading: false, loadingContent: ''})
          nav && nav.replace('RegisterSuccess', {name: '注册成功'})
        }
      } else if (msg_cmd === 3) {
        if (msg_id === 0) {
          //query user success  130
          const user = {
            name: data.name,
            avatar: data.avatar,
            id: data.id,
            pubkey: data.pubkey
          };
          UserStore.handleQueryUser(user);
        }
      } else if (msg_cmd === 4) {
        switch (msg_id) {
          case 0:
            //history 140
              console.log('new history---------->',data.histories)
            History.history = data.histories.slice().map((item)=>{
              let confirms = 0;
              if(appState.blockID - item.block_id +1 < 0 ||  appState.blockID - item.block_id +1 === 0 ){
                confirms = 0;
              }else if(appState.blockID - item.block_id +1 > 1000) {
                confirms = 1000
              }else {
                confirms = appState.blockID -item.block_id +1
              }
              item.confirms = (confirms === 1000? 'confirmed': `${confirms} confirms`)
              return item
            })
            UserStore.handleBalance(data.balance)
            historyTimer = setTimeout(()=>{
              transferHistory()
              historyTimer && clearTimeout(historyTimer)
            },10000)
            break;
          default:
        }
      }
    } else if (msg_type === 2) {
      if (msg_cmd === 0) {
        switch (msg_id) {
          case 0:
            //register 200
            app.setState({loading: true, loadingContent: I18n.t('sendLoading2')});
            SharedPreferences.setItem('pubkeyhex', tem_pub_key);
            SharedPreferences.setItem('privkeyhex', tem_pri_key);
            appState.privkeyhex = tem_pri_key;
            SharedPreferences.setItem('probe', '0');
            break;
          case 1:
            //register 201
            SharedPreferences.setItem('app_is_auto_login', '0');
            SharedPreferences.setItem('probe', '1');
            app.setState({loading: false, loadingContent: ''})
            nav && nav.replace('RegisterSuccess', {name: '注册成功'})
            break;
          case 2:
            app.setState({loading: true, loadingContent: I18n.t('sendLoading4')});
            loadTimer = setTimeout(() => {
              router.props.navigation && router.props.navigation.goBack();
              app.setState({loading: false});
              loadTimer && clearTimeout(loadTimer)
            }, 3000);
            break;
          case 3:
            app.setState({loading: true, loadingContent: I18n.t('sendLoading4')});
            loadTimer = setTimeout(() => {
              app.setState({loading: false});
              const user = {
                name: '',
                avatar: -1,
                id: '',
                pubkey: ''
              };
              router.setState({memoContent: '', amount: '', id: ''})
              UserStore.handleQueryUser(user);
              loadTimer && clearTimeout(loadTimer)
            }, 3000);
            break;
          default:
        }
      }
    } else if (msg_type === 3) {
      if (msg_cmd === 0) {
        if (msg_id === 0) {

          //300 receive new block info
          appState.blockID = data.block_id;
          appState.blockHash = data.block_hash;
          History.history = History.history.slice().map((item)=>{
            let confirms = 0;
            if(data.block_id - item.block_id +1 < 0 ||  data.block_id - item.block_id +1 === 0 ){
              confirms = 0;
            }else if(data.block_id - item.block_id +1 > 1000) {
              confirms = 1000
            }else {
              confirms = data.block_id -item.block_id +1
            }
            item.confirms = (confirms === 1000? 'confirmed': `${confirms} confirms`)
            return item
          })
        }
      }

    } else if (msg_type === 4) {
      //msgtype4
      if (msg_cmd === 0) {

        if (msg_id === 0) {
          appState.questionProbeCount = 0;
          data.questions.forEach((item) => {
            handleTopicsData(1, item)
          })
          questionProbeTimer = setTimeout(() => {
            probeQuestion();
            questionProbeTimer && clearTimeout(questionProbeTimer)
          }, 5000)
        } else if (msg_id === 1) {
          //question probe success 401
          if (data.result === 0) {
            appState.questionProbeCount = 0;
            data.questions.forEach((item) => {
              handleTopicsData(1, item)
            })
          } else if (data.result === 1) {
            appState.questionProbeCount = 0;
            data.questions.forEach((item) => {
              handleTopicsData(1, item)
            })
          } else if (data.result === 2) {
            appState.questionProbeCount += 1;
            const questions = TopicStore.questions.slice();
            const errorTopic = questions.splice(questions.length - 1, 1);
            TopicStore.handleQuestions(questions);
            deleteTopic(errorTopic[0].topic_key);
            probeQuestion();
            return
          }

          questionProbeTimer = setTimeout(() => {
            probeQuestion();
            questionProbeTimer && clearTimeout(questionProbeTimer)
          }, 5000)
        }

      } else if (msg_cmd === 1) {
        //reply probes
        handleReply(data.replies, data.result)

      } else if (msg_cmd === 2) {
        if (msg_id === 0) {
          const topic = data;
          delete topic.msg_type;
          delete topic.msg_cmd;
          delete topic.msg_id;
          handleTopicsData(0, topic)
        }
      } else if (msg_cmd === 3) {
        if (msg_id === 0) {
          //load answers success 430
          answerProbeTimer = setTimeout(() => {
            loadAnswers();
            answerProbeTimer && clearTimeout(answerProbeTimer);
          }, 5000);
          data.answers.forEach((item) => {
            handleTopicsData(2, item);
          })
        }
      }
    }
  };

  ws.onerror = (e) => {
    // 发生了一个错误
    router.setState({select: false});
    pingTimer && clearTimeout(pingTimer);
    if (appState.switchAPI) {
      appState.switchAPI = false;
      initNetwork(app, appState.api);
      return
    }
    if (!appState.appClose) {
      app.setState({loading: false, error: false, connectError: true});
      appState.connError = true;
    } else {
      BackHandler.exitApp();
    }

  };

  ws.onclose = (e) => {
    // 连接被关闭了
    answerProbeTimer && clearTimeout(answerProbeTimer);
  };
}catch (error){

}
}

function register(_router, sign_key, avatar) {
  router = _router;
  appState.loadMode = 0;
  SharedPreferences.setItem('sign', sign_key);
  SharedPreferences.setItem('name', Buffer.from(JSON.parse(sign_key).sign_data.name, 'base64').toString());
  SharedPreferences.setItem('avatar', avatar.toString());

  app.setState({loading: true, loadingContent: I18n.t('sendLoading1')})
  var sign_obj = JSON.parse(sign_key);
  var key_pair = ec.genKeyPair();
  var privkey_hex = key_pair.getPrivate("hex");
  var hash_raw = hash.sha256().update(hash.sha256().update(sign_key).digest()).digest();
  var privkey = ec.keyFromPrivate(privkey_hex, 'hex');
  var pubkey_hex = privkey.getPublic('hex');
  var pubkey = ec.keyFromPublic(pubkey_hex, 'hex');
  var privkey_b64 = Buffer.from(privkey_hex, 'hex').toString('base64');
  var pubkey_b64 = Buffer.from(pubkey_hex, 'hex').toString('base64');
  //保存
  //storage.save({key:'askcoinkey',data:{pubkey_b64,privkey_b64}});
  tem_pub_key = pubkey_hex;
  tem_pri_key = privkey_hex;
  //storage.save({key:'pubkeyhex',data:pubkey_hex})
  //storage.save({key:'privkeyhex', data:privkey_hex})

  var data_obj = {};
  data_obj.type = 1;
  data_obj.pubkey = pubkey_b64;
  data_obj.utc = Math.round(parseInt(Date.now() / 1000) + AppStore.utc);
  data_obj.avatar = avatar;
  data_obj.sign = sign_obj.sign;
  data_obj.sign_data = sign_obj.sign_data;
  var tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  var sign = privkey.sign(tx_hash_raw).toDER();
  var sign_b64 = Buffer.from(sign).toString('base64');
  var packet = {msg_type: 2, msg_cmd: 0, msg_id: 0, sign: sign_b64, data: data_obj};
  SharedPreferences.setItem('probe', '1')
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
}

function testSign() {
  const data_obj = {};
  data_obj.utc = Math.round(parseInt(Date.now() / 1000) + AppStore.utc);
  SharedPreferences.getItems(['privkeyhex', 'probe'], (res) => {
    switch (res[1]) {
      case '0':
        app.setState({loading: true, loadingContent: I18n.t('sendLoading2')});
        appState.testPri = res[0];
        sendTestSign();
    }


  })
}

function sendTestSign() {
  const data_obj = {};
  const privkey = ec.keyFromPrivate(appState.testPri, 'hex');
  data_obj.pubkey = priHexToPubB64(appState.testPri);
  data_obj.utc = Math.round(parseInt(Date.now() / 1000) + AppStore.utc);
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 1, msg_cmd: 2, msg_id: 0, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
}


function loadSYSInfo() {
  //020
  var packet = {msg_type: 0, msg_cmd: 2, msg_id: 0};
  appState.localStartTime = parseInt(Date.now() / 1000);
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
}

function importPriKey(_route, privb64) {
  /*if (ws && ws.readyState !== 1) {
    setTimeout(() => {
      importPriKey(_route, privb64)
    }, 1000);
    return
  }*/

  if (_route) {
    router = _route;
  }
  if (loadCurRouter() === 'Register' ||loadCurRouter() === 'RegisterSuccess' ) {
    app.setState({loading: true, loadingContent: I18n.t('loading1')});
  }
  const privhex = Buffer.from(privb64, 'base64').toString('hex');
  temimpprivkey = privhex;
  const privkey = ec.keyFromPrivate(privhex, 'hex');
  const pubkey_hex = privkey.getPublic('hex');
  const pubkey_b64 = Buffer.from(pubkey_hex, 'hex').toString('base64');
  const data_obj = {};
  data_obj.pubkey = pubkey_b64;
  data_obj.utc = Math.round(parseInt(Date.now() / 1000) + AppStore.utc);
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 1, msg_cmd: 0, msg_id: 0, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
}


function loadPrivkey() {
  SharedPreferences.getItem('privkeyhex', (res) => {
    appState.privkeyhex = res
  })
}

function priHexToPubB64(priHex) {
  const privkey = ec.keyFromPrivate(priHex, 'hex');
  const pubkey_hex = privkey.getPublic('hex');
  return Buffer.from(pubkey_hex, 'hex').toString('base64');
}

function loadBase64PublicKey(privHex) {
  const privkey = ec.keyFromPrivate(privHex, 'hex');
  const pubkey_hex = privkey.getPublic('hex');
  return Buffer.from(pubkey_hex, 'hex').toString('base64');
}

function loadSign(privHex, signData) {
  const privkey = ec.keyFromPrivate(privHex, 'hex');
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(signData)).digest()).digest();
  return Buffer.from(privkey.sign(tx_hash_raw).toDER()).toString('base64');
}

const exitApp = () => {
  if (ws !== null) {
    ws.close()
  }
};

function loadLoginStatus() {
  SharedPreferences.getItem('app_is_auto_login', (value) => {
    if (value === null) {
      appState.loginStatus = '-1'
    } else {
      appState.loginStatus = value;
    }
  });

  SharedPreferences.getItem('laned', (res) => {
    if (res === '1') {
      appState.laned = true
    }
  });

}

const loadLan = () => {
  SharedPreferences.getItem('laned', (res) => {
    if (res !== 'null') {
      router.props.navigation && router.props.navigation.replace('Register')
    }
  });

}

const ToAPiSwitch = () => {
  if (appState.loginStatus === '1' && (loadCurRouter() === 'Register' || loadCurRouter() === 'LanguageSwitch')) {
    AppStore.handleRetryMode(true)
  } else {
    AppStore.handleRetryMode(false)
  }
  if (appState.apiPage) {
    app.setState({connectError: false})
  } else {
    router.props.navigation && router.props.navigation.navigate('ApiSwitch')
  }

};

const toRegister = () => {
  router.props.navigation && router.props.navigation.replace('Register', {name: '注册'})
}


const handleRouter = (_router) => {
  router.props.navigation && router.props.navigation.replace(_router)
}

const closeWS = () => {
  pingTimer && clearTimeout(pingTimer);
  appState.appClose = true;
  appState.connError = false;
  if (ws.readyState === 3) {
    BackHandler.exitApp();
    return;
  }
  ws.close();
};

const close = () => {
  ws.close();
};

const switchApi = () => {
  appState.mode = 1;
  appState.switchAPI = true;
  appState.switchAPITip = true;
  app.setState({loading: true, loadingContent: I18n.t('reTryLoading')});
  if (ws.readyState === 3) {
    initNetwork(app, appState.api);
    pingTimer && clearTimeout(pingTimer);
    return
  }
  pingTimer && clearTimeout(pingTimer);
  ws.close();
};

const showLoading = (content) => {
  app.setState({loading: true, loadingContent: content});
};

const showNetError = (connectError) => {
  app.setState({connectError});
};

const confirmNet = () => {
  if (ws.readyState === 3) {
    app.setState({connectError: true});
  }
};

const handleToast = () => {
  appState.toast = false;
  toastTimer = setTimeout(() => {
    appState.toast = true;
    toastTimer && clearTimeout(toastTimer)
  }, 1000)
};

const toast = (content) => {
  if (appState.toast) {
    handleToast();
    ToastAndroid.showWithGravity(content, ToastAndroid.SHORT, ToastAndroid.CENTER);
  }
};

const createTopic = (content, reward) => {
  if (content === '' || !content) {
    toast(I18n.t('problemEmpty'))
    return;
  }
  if (strlen(content) > 1000) {
    toast(I18n.t('inputError11'))
    return
  }
  if (reward === '' || !reward) {
    toast(I18n.t('rewardEmpty'))
    return;
  }
  if (reward === '0') {
    toast(I18n.t('reward0'))
    return;
  }

  app.setState({loading: true, loadingContent: I18n.t('sending')});
  appState.loadMode = 1;
  const privkey = ec.keyFromPrivate(appState.privkeyhex, 'hex');
  const pubB64 = loadBase64PublicKey(appState.privkeyhex);
  const data_obj = {};
  data_obj.type = 3;
  data_obj.pubkey = pubB64;
  data_obj.block_id = appState.blockID;
  data_obj.fee = 2;
  data_obj.reward = parseInt(reward);
  data_obj.topic = Buffer.from(content).toString('base64');
  data_obj.utc = parseInt(Date.now() / 1000);
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 2, msg_cmd: 0, msg_id: 2, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
};

const reply = (content) => {
  if (strlen(content) > 1000) {
    toast(I18n.t('inputError12'))
    return
  }
  appState.loadMode = 1;
  app.setState({loading: true, loadingContent: I18n.t('sending')});
  const privkey = ec.keyFromPrivate(appState.privkeyhex, 'hex');
  const pubB64 = loadBase64PublicKey(appState.privkeyhex);
  const data_obj = {};
  data_obj.type = 4;
  data_obj.pubkey = pubB64;
  data_obj.block_id = appState.blockID;
  data_obj.fee = 2;
  data_obj.reply = Buffer.from(content).toString('base64');
  data_obj.utc = parseInt(Date.now() / 1000);
  data_obj.topic_key = TopicStore.selectTopic.topic_key;
  if (appState.replyMode === 1) {
    data_obj.reply_to = TopicStore.selectReply.reply_key;
  }
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 2, msg_cmd: 0, msg_id: 2, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
};


const topicDetail = () => {
  let packet = {};
  packet.msg_type = 4;
  packet.msg_cmd = 1;
  packet.topic_key = TopicStore.selectTopic.topic_key;

  if (appState.toDetail === 1 || appState.toDetail === 2) {
    app.setState({loading: true, loadingContent: I18n.t('replyLoading')});
  }
  if (TopicStore.replies.slice().length === 0 || appState.replyProbeCount > 10) {
    packet.msg_id = 0;
  } else {
    const latest = TopicStore.replies.slice().reverse()[0];
    packet.msg_id = 1;
    packet.block_hash = latest.block_hash;
    packet.reply_key = latest.reply_key;
  }

  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (error) {

  }
};

const probeQuestion = () => {
  let packet = {};
  packet.msg_type = 4;
  packet.msg_cmd = 0;
  switch (appState.questionType) {
    case 0:
      packet.msg_id = 0;
      break;
    case 1:
      packet.msg_id = 1;
      const latest = TopicStore.questions.slice().reverse()[0];
      try {
        packet.block_hash = latest.block_hash;
        packet.topic_key = latest.topic_key;
      } catch (error) {

      }
  }
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (error) {

  }
};

const loadAnswers = () => {
  let packet = {};
  packet.msg_type = 4;
  packet.msg_cmd = 3;
  packet.msg_id = 0;
  try {
    if (ws.readyState === 1) {
      ws.readyState === 1 && ws.send(JSON.stringify(packet));
    }
  } catch (error) {

  }
};

const handleTopicsData = (type, topic) => {
  const index = handleTopics(topic, type);
  const topics = TopicStore.topics.slice();
  const questions = TopicStore.questions.slice();
  const answers = TopicStore.answers.slice();
  switch (type) {
    case 0:
      try {
        const topicIndex = TopicStore.topics.slice().findIndex((item) => {
          return item.topic_key === topic.topic_key
        });
        const answerIndex = TopicStore.answers.slice().findIndex((item) => {
          return item.topic_key === topic.topic_key
        });

        if (topicIndex !== -1 && TopicStore.topics.slice()[topicIndex].block_id < topic.block_id) {
          topics.splice(topicIndex, 1, topic);
          TopicStore.handleTopics(topics)
        }


        if (topicIndex === -1 && answerIndex === -1 && UserStore.id !== topic.id && UserStore.name !== topic.name) {
          if (TopicStore.topics.length > 200) {
            topics.slice().splice(0, 1);
            deleteTopic(TopicStore.topics.slice()[0].topic_key)
          }
          TopicStore.handleTopics(topics.concat(topic))
          addTopic(topic, 0);
        }
      } catch (error) {

      }
      break;
    case 1:
      if (index === 0) {
        TopicStore.handleQuestions(questions.concat(topic));
        addTopic(topic, 1);
      }
      break;
    case 2:
      if (index === 0) {
        TopicStore.handleAnswers(answers.concat(topic));
        addTopic(topic, 2)
      }
      break;
    default:
  }
};

const handleTopics = (topic, type) => {
  const index2 = TopicStore.questions.slice().findIndex((item => {
    return item.topic_key === topic.topic_key
  }));

  const index3 = TopicStore.answers.slice().findIndex((item) => {
    return item.topic_key === topic.topic_key
  });

  if (type === 2) {
    const index = TopicStore.topics.slice().findIndex((item => {
      return item.topic_key === topic.topic_key
    }));

    if (index !== -1) {
      const topics = TopicStore.topics.slice();
      const errorTopic = topics.splice(index, 1);
      deleteTopic(errorTopic[0].topic_key);
      TopicStore.handleTopics(topics)
    }
  }

  if (index2 === -1 && index3 === -1) {
    return 0
  } else {
    return 1
  }

};

const handleReply = (reply, resultCode) => {
  app.setState({loading: false});
  if (appState.toDetail === 1) {
    router.props.navigation && router.props.navigation.navigate('QuestionDetail')
  } else if (appState.toDetail === 2) {
    router.props.navigation && router.props.navigation.navigate('AnswerDetail')
  } else if (appState.toDetail === 3) {
    return
  }
  appState.toDetail = 0;
  const topicKey = TopicStore.selectTopic.topic_key;
  if (resultCode !== 2) {
    reply = reply.map(item => {
      const newReply = item
      newReply.topic_key = topicKey
      return newReply
    });
  }

  switch (resultCode) {
    case 0:
      TopicStore.handleAllReplies(TopicStore.allReplies.filter((item) => {
        return item.topic_key !== TopicStore.selectTopic.topic_key
      }).concat(reply));
      TopicStore.handleReplies(reply)
      appState.replyProbeCount = 0;
      deleteReplyByTopicKey(topicKey);
      addReply(reply, topicKey);
      break;
    case 1:
      //add new replies
      appState.replyProbeCount = 0;
      TopicStore.handleAllReplies(TopicStore.allReplies.slice().concat(reply))
      TopicStore.handleReplies(TopicStore.replies.slice().concat(reply));
      addReply(reply, topicKey);
      break;
    case 2:
      //next probe
      if (TopicStore.replies.length === 0) {
        break
      }
      const replies = TopicStore.replies;
      appState.replyProbeCount = appState.replyProbeCount + 1;
      const errorReply = replies.splice(TopicStore.replies.length - 1, 1);
      const index = TopicStore.allReplies.indexOf(errorReply)
      const allReplies = TopicStore.allReplies.slice();
      allReplies.splice(index, 1)
      TopicStore.handleReplies(replies);
      TopicStore.handleAllReplies(allReplies);
      deleteReply(errorReply[0].reply_key);
      topicDetail();
      return;
    case 3:
      // no such topic
      router.props.navigation && router.props.navigation.goBack();
      toast(I18n.t('expired'));
      break;
    default:
  }

  replyProbeTimer = setTimeout(() => {
    topicDetail();
  }, 5000)
};


const initTopic = async () => {
  TopicStore.handleTopics(getTopic(0));
  TopicStore.handleQuestions(getTopic(1));
  TopicStore.handleAnswers(getTopic(2));
  TopicStore.handleAllReplies(getReply());
};

const reward = (replyKey, amount) => {
  appState.loadMode = 1;
  app.setState({loading: true, loadingContent: I18n.t('sending')});
  const privkey = ec.keyFromPrivate(appState.privkeyhex, 'hex');
  const pubB64 = loadBase64PublicKey(appState.privkeyhex);
  const data_obj = {};
  data_obj.type = 5;
  data_obj.pubkey = pubB64;
  data_obj.block_id = appState.blockID;
  data_obj.fee = 2;
  data_obj.utc = parseInt(Date.now() / 1000);
  data_obj.topic_key = TopicStore.selectTopic.topic_key;
  data_obj.reply_to = replyKey;
  data_obj.amount = amount;
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 2, msg_cmd: 0, msg_id: 2, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
};

const stopDetailProbe = () => {
  appState.toDetail = 3;
  replyProbeTimer && clearTimeout(replyProbeTimer)
};

const loadReplies = () => {
  try {
    const replies = TopicStore.allReplies.slice().filter((item) => {
      return item.topic_key === TopicStore.selectTopic.topic_key
    });

    TopicStore.handleReplies(replies)
  } catch (e) {

  }
};

const loadCurRouter = () => {
  return router.props.navigation.state.routeName
};

const transfer = (amount, memo) => {
  app.setState({loading: true, loadingContent: I18n.t('sending')});
  setTimeout(() => {
    app.setState({loading: false});
  }, 3000);
  const privkey = ec.keyFromPrivate(appState.privkeyhex, 'hex');
  const pubB64 = loadBase64PublicKey(appState.privkeyhex);
  const data_obj = {};
  data_obj.type = 2;
  data_obj.pubkey = pubB64;
  data_obj.block_id = appState.blockID;
  data_obj.fee = 2;
  data_obj.utc = parseInt(Date.now() / 1000);
  data_obj.amount = amount;
  if(memo !== ''){
    data_obj.memo = Buffer.from(memo).toString('base64');
  }
  data_obj.receiver = UserStore.queryUser.pubkey;
  const tx_hash_raw = hash.sha256().update(hash.sha256().update(JSON.stringify(data_obj)).digest()).digest();
  const sign = privkey.sign(tx_hash_raw).toDER();
  const sign_b64 = Buffer.from(sign).toString('base64');
  const packet = {msg_type: 2, msg_cmd: 0, msg_id: 3, sign: sign_b64, data: data_obj};
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (err) {

  }
};

const queryAccount = (id) => {
  let packet = {};
  packet.msg_type = 1;
  packet.msg_cmd = 3;
  packet.msg_id = 0;
  packet.id = id;
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (error) {

  }
};

const handleErrorModal = (status, errorContent) => {
  app.setState({error: status, errorContent})
};

const transferHistory = () => {
  let packet = {};
  packet.msg_type = 1;
  packet.msg_cmd = 4;
  packet.msg_id = 0;
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (error) {

  }
};

const loadTop100 = () => {
  let packet = {};
  packet.msg_type = 1;
  packet.msg_cmd = 1;
  packet.msg_id = 1;
  try {
    ws.readyState === 1 && ws.send(JSON.stringify(packet));
  } catch (error) {

  }
};

const backScreen = () => {
  if (loadCurRouter() === 'QuestionDetail' || loadCurRouter() === 'AnswerDetail') {
    topicDetail();
  }
};

const setRouterName = (routerName) => {
  //app.setState({routerName: routerName})
};


export {
  setRouterName,
  backScreen,
  History,
  transfer,
  queryAccount,
  loadReplies,
  stopDetailProbe,
  compare,
  reward,
  initTopic,
  loadAnswers,
  probeQuestion,
  topicDetail,
  reply,
  Topic,
  createTopic,
  toast,
  confirmNet,
  showNetError,
  showLoading,
  switchApi,
  handleRouter,
  closeWS,
  ToAPiSwitch,
  toRegister,
  initRouter,
  loadLan,
  exitApp,
  loadPrivkey,
  loadLoginStatus,
  initNetwork,
  register,
  initNav,
  testSign,
  importPriKey,
  appState,
  loadBase64PublicKey,
  loadSign,
  ws,
  apiSaved,
  handleErrorModal,
  Top100List
}
