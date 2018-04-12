/**
 * Created by xiaoming on 2017/6/7.
 */
import React,{Component} from 'react';

import { TabNavigator, StackNavigator} from 'react-navigation';
import TabIcon from '../../components/TabIcon';
import {
  Platform
} from 'react-native';
import Home from '../home/index';
import My from '../my/index';
import Transfer from '../transfer/index';
import Advanced from '../advanced/index';
import HomeNormalIcon from '../../resource/icons/home_bt1.png';
import MyNormalIcon from '../../resource/icons/home_bt2.png';
import TransferNormalIcon from '../../resource/icons/home_bt3.png';
import AdvanceNormalIcon from '../../resource/icons/home_bt4.png';

import HomeFocusedIcon from '../../resource/icons/home_bt1_click.png';
import MyFocusedIcon from '../../resource/icons/home_bt2_click.png';
import TransferFocusedIcon from '../../resource/icons/home_bt3_click.png';
import AdvanceFocusedIcon from '../../resource/icons/home_bt4_click.png';

const isShowLine = Platform.OS === 'android' && Platform.Version < 21;
const Tabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          isImage={true}
          normalSource={HomeNormalIcon}
          focusedSource={HomeFocusedIcon}
          focused={focused}
          label={'抢答'}/>
      ),
    }
  },
  My: {
    screen: My,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          isImage={true}
          normalSource={MyNormalIcon}
          focusedSource={MyFocusedIcon}
          focused={focused}
          label={'我的'}/>
      ),
    }
  },
  Transfer: {
    screen: Transfer,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          isImage={true}
          normalSource={TransferNormalIcon}
          focusedSource={TransferFocusedIcon}
          focused={focused}
          label={'转账'}/>
      ),
    }
  },
  Advanced: {
    screen: Advanced,
    navigationOptions:{
      tabBarIcon: ({focused}) => (
        <TabIcon
          isImage={true}
          normalSource={AdvanceNormalIcon}
          focusedSource={AdvanceFocusedIcon}
          focused={focused}
          label={'高级'}/>
      ),
    }
  },
},{
  tabBarPosition:'bottom',
  swipeEnabled:false,
  animationEnabled:false,
  scrollEnabled:false,
  initialRouteName: 'Home',
  tabBarOptions: {
    style: {
      padding: 0,
      margin: 0,
      backgroundColor:COLOR.whiteColor,
      borderTopWidth:isShowLine?1:0,
      borderTopColor:isShowLine?COLOR.diverColor:null
    },
    indicatorStyle:{
      height:0,
    },
    iconStyle:{
      margin:0,
      padding:0,
      height:40,
      width:ScreenWidth/4
    },
    showLabel:false,
    showIcon:true,
  },
});

Tabs.navigationOptions = {
  header:null
};




export default Tabs;