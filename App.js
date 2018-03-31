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
import SplashScreen from 'react-native-splash-screen';
import NavButton from './src/components/NavButton';
import LanguageSwitch from './src/pages/login/LanguageSwitch';
import ApiServerSwitch from './src/pages/login/ApiServerSwitch';
import Register from './src/pages/login/Register';
import RegisterSuccess from './src/pages/login/RegisterSuccess';
import WalletRestore from './src/pages/login/WalletRestore';
import Tabs from './src/pages/main/Tabs';
import ApiSwitch from './src/pages/advanced/ApiSwitch';


export default class App extends Component<{}> {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
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
  }
},{
  initialRouteName:'Tabs',
  initialRouteParams:{name:'语言选择'},
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
            type:'icon',
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
        fontSize:FONTSIZE.large,
        color:COLOR.primaryTextColor,
        alignSelf:'center'
      },
    }
  }
});
