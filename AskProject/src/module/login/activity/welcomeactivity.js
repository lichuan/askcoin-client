/**
本界面是欢迎界面
**/
import React,{ Component } from "react";

import {
  View,
} from "react-native";

//引入欢迎界面的布局
import WelcomeLayout from "../layout/activity_welcome.js";

//到处界面
export default class WelcomeActivity extends Component{

    render(){
      let mView =
          (<WelcomeLayout style={{flex:1}}>

          </WelcomeLayout>);
      return mView;
    }
}
