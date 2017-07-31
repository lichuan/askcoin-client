/**
本界面是欢迎界面
**/
import React, {Component} from "react";

import {View} from "react-native";
import {StackNavigator} from 'react-navigation';
//引入欢迎界面的布局
import WelcomeLayout from "../layout/activity_welcome.js";

//到处界面
export default class WelcomeActivity extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
     this.navigate = this.props.navigation.navigate;
  }
  render() {
    let mView = (
      <WelcomeLayout style={{
        flex: 1
      }}></WelcomeLayout>
    );
    return mView;
  }
  componentDidMount() {
    this._timer = setTimeout(() => {
      this.operateNextIntent();
    }, 1000);
  }
  componentWillUnmount() {
    this._timer && clearTimeout(this._timer);
  }
  //判断进入的界面
  operateNextIntent=()=> {
    //tiao
    this.navigate("ServerIp");
  }
}
