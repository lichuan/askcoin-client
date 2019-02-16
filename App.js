/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Modal, TouchableOpacity,BackHandler,ToastAndroid,AppState
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import './src/global/GlobalRegister';
import ArrowLeft from './src/resource/icons/arrow_left.png';
import NavButton from './src/components/NavButton';

import SplashScreen from 'react-native-splash-screen';
import LanguageSwitch from './src/pages/login/LanguageSwitch';
import ApiServerSwitch from './src/pages/login/ApiServerSwitch';
import Register from './src/pages/login/Register';
import RegisterSuccess from './src/pages/login/RegisterSuccess';
import WalletRestore from './src/pages/login/WalletRestore';
import Tabs from './src/pages/main/Tabs';
import ApiSwitch from './src/pages/advanced/ApiSwitch';
import QuestionDetail from './src/pages/my/QuestionDetail';
import AnswerDetail from './src/pages/my/AnswerDetail';

import AskQuestion from './src/pages/my/AskQuestion';
import SplashView from './src/pages/login/SplashView';

import Reply from './src/pages/my/Reply';
import ReplyAll from './src/pages/my/ReplyAll';

import Top from './src/pages/advanced/Top100';
import CreateSign from './src/pages/advanced/CreateSign';
import MySign from './src/pages/advanced/MySign'
import LauSwitch from './src/pages/advanced/LauSwitch'
import About from './src/pages/advanced/About'
import {observer} from 'mobx-react'
import {
  appState, importPriKey, initNav, initNetwork, ToAPiSwitch, backScreen, toRegister,
  loadPrivkey, loadLoginStatus, closeWS, handleRouter, exitApp,toast,initTopic,ws
} from './src/net/net'
import ModalContainer from "./src/views/modalContainer";
import Loading from "./src/components/Loading";
import {I18n} from './src/language/I18n';
import AppStore from  './src/stores/app'

var SharedPreferences = require('react-native-shared-preferences');
let a = 1;

let lastBackPressed = Date.now();




console.disableYellowBox=true;

class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.flag = false;
    this.state = {
      showLoading: true,
      error: false,
      errorContent:'',
      loading: false,
      loadingContent:'',
      connectError:false,
      backend:false,
      utc:0,
      connect:false,
      routerName:'',
      imported:false
    }
  }

  async componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    setTimeout(()=>{
      initNetwork(this);
      loadLoginStatus(this);
      loadPrivkey();
    },1000)

  }

  loadData = ()=>{
      a+=1;
     setTimeout(()=>{
       this.loadData()
     },2000);
  };


  loadLoginStatus= ()=>{
    AppStore.handleRetryMode(true)
  };

  handleAppStateChange = (nextAppState)=>{
    if(nextAppState !== null && nextAppState ==='active' && this.flag){
      backScreen()
    }else if(nextAppState !== null && nextAppState === 'background'){
      this.flag = true;
      this.setState({backend:true})
    }
  };


  componentDidMount() {
    AppState.addEventListener('change',this.handleAppStateChange);
    SplashScreen.hide();
    this.timer = setTimeout(()=>{
      this.loadLoginStatus();
    },2000);

    this.loadData();
    SharedPreferences.getItem('lan',(res)=>{
      I18n.locale = res
    })
  }

  toHome=()=>{
    this.setState({
      showLoading: false
    })
  };

  onBackPressed() {
    if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
      closeWS();
    }
    lastBackPressed = Date.now();
    toast(I18n.t('exitApp'));
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    this.timer && clearTimeout(this.timer);
  }

  render() {
    const {error, errorContent, loading, loadingContent, connectError} = this.state


    return (
        <View style={STYLE.BACKGROUND}>
          <View style={{display:this.state.showLoading?'flex':'none',position: 'absolute', width: '100%', height: '100%',backgroundColor:'#fff',zIndex: 999}}>
          <Modal visible={this.state.showLoading}>
            <SplashView
                onOk={this.toHome}
                onPress={() => this.setState({showLoading: false})}/>
          </Modal>
          </View>
          <StatusBar
              ref={(a) => this.bar = a}
              barStyle={'dark-content'}
              backgroundColor={COLOR.primaryColor}/>
          <AppNavigator/>
          <Modal
              transparent
              visible={error}>
            <ModalContainer>
              <View style={styles.tipView}>
                <Text style={styles.tipTitle}>{'WARNING'}</Text>
                <Text style={styles.errorTip}>{errorContent}</Text>
                <View style={{flexDirection: 'row', borderTopColor: '#E7E7E7', borderTopWidth: 1}}>
                  <TouchableOpacity
                      style={[styles.tipBtn, {borderRightColor: '#E7E7E7', borderRightWidth: 1}]}
                      onPress={()=>{
                        this.setState({error: false})
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.tipBtn}
                      onPress={()=>{
                        this.setState({error: false})
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('OK')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalContainer>
          </Modal>
          <Modal
              transparent
              visible={connectError}>
            <ModalContainer>
              <View style={styles.tipView}>
                <Text style={styles.tipTitle}>{'WARNING'}</Text>
                <Text style={styles.errorTip}>{I18n.t('reConnection')}</Text>
                <View style={{flexDirection: 'row', borderTopColor: '#E7E7E7', borderTopWidth: 1}}>
                  <TouchableOpacity
                      style={[styles.tipBtn, {borderRightColor: '#E7E7E7', borderRightWidth: 1}]}
                      onPress={()=>{
                        this.setState({connectError: false, loading:true,loadingContent: I18n.t('reTryLoading')});
                        appState.mode = 1;
                        setTimeout(()=>{
                          SharedPreferences.getItem('app_is_auto_login', (value) => {

                            if (value === null) {
                              appState.loginStatus = '-1'
                            } else {
                              appState.loginStatus = value;
                            }
                          });
                          if(appState.api === ''){
                            initNetwork(this)
                          }else {
                            initNetwork(this, appState.api)
                          }
                        },500)
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('reTry')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.tipBtn}
                      onPress={()=>{
                        appState.autoSwitchAPI = true;
                        this.setState({connectError: false,showLoading:false});
                        ToAPiSwitch();
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('switchAPI')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalContainer>
          </Modal>
          <Loading show={loading} tip={loadingContent}/>
        </View>
    );
  }
}

const AppNavigator = StackNavigator({
  Register: {
    screen: Register,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('registration'),
    })
  },
  Tabs: {
    screen: Tabs,
  },
  RegisterSuccess: {
    screen: RegisterSuccess,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('registeredSuccessfully'),
    })
  },
  LanguageSwitch: {
    screen: LanguageSwitch,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('switchLanguage'),
    })
  },
  ApiServerSwitch: {
    screen: ApiServerSwitch,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('APISelect'),
    })
  },
  WalletRestore: {
    screen: WalletRestore,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('switchLanguage'),
    })
  },
  ApiSwitch: {
    screen: ApiSwitch,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('APISelect'),
    })
  },
  QuestionDetail: {
    screen: QuestionDetail,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('questionDetails'),
    })
  },
  AnswerDetail: {
    screen: AnswerDetail,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('answerDetails'),
    })
  },
  AskQuestion: {
    screen: AskQuestion,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('postQuestion'),
    })
  },
  Reply: {
    screen: Reply,

  },
  ReplyAll: {
    screen: ReplyAll,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('reply'),
    })
  },
  Top: {
    screen: Top,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('top100'),
    })
  },
  CreateSign: {
    screen: CreateSign,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('createSignature'),
    })
  },
  MySign: {
    screen: MySign,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('myPrivateKey'),
    })
  },
  LauSwitch:{
    screen: LauSwitch,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('switchLanguage'),
    })
  },
  About:{
    screen:About,
    navigationOptions: ({navigation}) => ({
      title: I18n.t('about'),
    })
  }
}, {
  initialRouteName: 'LanguageSwitch',
  headerMode: 'screen',
  navigationOptions: ({navigation}) => {
    let {state, goBack} = navigation;
    // 用来判断是否隐藏或显示header
    initNav(navigation);
    let title = '';
    let onLeftPress;
    if (state.params) {
      if (state.params.name) {
        title = state.params.name   //是否显示标题
      }
      if (state.params.onLeftPress) {
        onLeftPress = state.params.onLeftPress;  //是否自定义左边按钮的响应事件
      }
    }
    return {
      headerStyle: {
        backgroundColor: COLOR.primaryColor,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft: (
          <NavButton
              data={{
                type: 'image',
                uri: ArrowLeft,
                onPress: onLeftPress
                    ? onLeftPress
                    : () => {
                      goBack();
                    }
              }}/>
      ),
      headerBackTitle: null,
      headerRight: (
          <View style={{width: 48, height: 48}}/>
      ),
      headerTitleStyle: {
        flex: 1,
        textAlign: 'center',
        fontSize: FONTSIZE.large,
        color: COLOR.primaryTextColor,
        fontWeight: 'normal'
      },
    }
  }
});

const styles = StyleSheet.create({
  tip: {
    fontSize: 13,
    paddingTop: 6,
    width: 92,
    height: 32,
    position: 'absolute',
    top: 30,
    color: '#fff',
    backgroundColor: '#00000081',
    textAlign: 'center'
  },
  tipView: {
    width: ScreenWidth / 10 * 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden'
  },
  tipTitle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    color: '#333333'
  },
  tipBtn: {
    height: 52,
    backgroundColor: '#fff',
    width: ScreenWidth / 10 * 9 / 2,
    color: COLOR.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontSize: 15,
    color: COLOR.normalColor
  },
  subTip: {
    fontSize: 15,
    marginTop: 14,
    lineHeight: 20,
    paddingHorizontal: 36
  },
  tipSubTitle: {
    fontSize: 15,
    paddingHorizontal: 16,
    lineHeight: 23,
    marginTop: 8
  },
  errorTip: {
    fontSize:15,
    lineHeight:23,
    paddingHorizontal:24,
    marginTop:6,
    marginBottom:24
  }
});

export default observer(App)
