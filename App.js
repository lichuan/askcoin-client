/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar
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
import ReplyDetail from './src/pages/my/ReplyDetail';
import AnswerDetail from './src/pages/my/AnswerDetail';
import CheckAnswerDetail from './src/pages/my/CheckAnswerDetail';

import AskQuestion from './src/pages/my/AskQuestion';
import SplashView from './src/pages/login/SplashView';


export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      showLoading:true
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    this.timer = setTimeout(()=>{
      this.setState({
        showLoading:false
      })
    },2000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  render() {
    if(this.state.showLoading){
      return(
        <SplashView
          onPress={()=>this.setState({showLoading:false})}/>
      )
    }

    return (
      <View style={STYLE.BACKGROUND}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={COLOR.primaryColor}/>
        <AppNavigator/>
      </View>
    );
  }
}

const AppNavigator = StackNavigator({
  Register:{
    screen:Register,
  },
  Tabs:{
    screen:Tabs,
  },
  RegisterSuccess:{
    screen:RegisterSuccess
  },
  LanguageSwitch:{
    screen:LanguageSwitch
  },
  ApiServerSwitch: {
    screen: ApiServerSwitch
  },
  WalletRestore: {
    screen: WalletRestore
  },
  ApiSwitch: {
    screen: ApiSwitch
  },
  QuestionDetail: {
    screen: QuestionDetail
  },
  ReplyDetail:{
    screen: ReplyDetail
  },
  AnswerDetail:{
    screen: AnswerDetail
  },
  CheckAnswerDetail:{
    screen: CheckAnswerDetail
  },
  AskQuestion:{
    screen: AskQuestion
  }
},{
  initialRouteName:'ApiServerSwitch',
  initialRouteParams:{name:'选择节点服务器'},
  headerMode:'screen',
  navigationOptions:({navigation}) => {
    let {state,goBack} = navigation;
    // 用来判断是否隐藏或显示header
    // console.log(navigation)
    let title = '';
    let onLeftPress;
    if(state.params){
      if(state.params.name){
        title = state.params.name   //是否显示标题
      }
      if(state.params.onLeftPress){
        onLeftPress= state.params.onLeftPress;  //是否自定义左边按钮的响应事件
      }
    }
    return {
      headerTitle: title,
      headerStyle :{
        backgroundColor: COLOR.primaryColor,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerLeft:(
        <NavButton
          data={{
            type:'image',
            uri:ArrowLeft,
            onPress: onLeftPress
              ? onLeftPress
              :()=>{
                goBack();
              }
          }}/>
      ),
      headerBackTitle: null,
      headerRight:(
        <View style={{width: 48,height: 48}}/>
      ),
      headerTitleStyle:{
        flex:1,
        textAlign:'center',
        fontSize:FONTSIZE.large,
        color:COLOR.primaryTextColor
      },
    }
  }
});
