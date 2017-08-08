import React, {Component} from "react";

import {View, Text, StyleSheet, Platform} from "react-native";
import {TabNavigator, TabBarBottom} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {mainBgColor,activeColorHome} from "../../style/color.js";
import {getAdapterSize} from "../../style/dimens.js";

//引入抢答模块
import QuestionActivity from "../../module/question/activity/QuestionActivity.js";
//引入mine模块
import MineActivity from "../../module/mine/activity/MineActivity.js";
//引入转账模块
import TransferAccountsActivity from "../../module/transfer/activity/TransferAccountsActivity.js";
//引入高级模块
import HighGradeActivity from "../../module/more/activity/HighGradeActivity.js";

//主界面滑动框架
class MainActivity extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    header: null
  };
  render() {
    var mView = (
      <MainComponent></MainComponent>
    );
    return mView;
  }
}

const MainComponent = TabNavigator({
  Question: {
    screen: QuestionActivity,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
        ? 'ios-aperture'
        : 'ios-aperture-outline'} size={getAdapterSize(26)} style={{
        color: tintColor
      }}/>),
      tabBarLabel: '抢答'
    }
  },
  Mine: {
    screen: MineActivity,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
        ? 'ios-body'
        : 'ios-body-outline'} size={getAdapterSize(26)} style={{
        color: tintColor
      }}/>),
      tabBarLabel: '我的'
    }
  },
  Transfer: {
    screen: TransferAccountsActivity,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
        ? 'ios-basket'
        : 'ios-basket-outline'} size={getAdapterSize(26)} style={{
        color: tintColor
      }}/>),
      tabBarLabel: '转账'
    }
  },
  High: {
    screen: HighGradeActivity,
    navigationOptions: {
      tabBarIcon: ({tintColor, focused}) => (<Ionicons name={focused
        ? 'ios-archive'
        : 'ios-archive-outline'} size={getAdapterSize(26)} style={{
        color: tintColor
      }}/>),
      tabBarLabel: '高级'
    }
  }
}, {
  tabBarOptions: {
    inactiveTintColor:mainBgColor,
    activeTintColor:activeColorHome,
  },
  tabBarPosition: 'bottom',
  showIcon: true,
  tabBarComponent: TabBarBottom
});
export default MainComponent;
const styles = StyleSheet.create({});
