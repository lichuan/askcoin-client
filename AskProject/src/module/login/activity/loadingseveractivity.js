/**
连接服务器的界面
**/
import React,{ Component } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";
//引入布局文件
import LoadingServeLayout from "../layout/activity_loadingserver.js"

const styles = StyleSheet.create({

});

export default class LoadingServerActivity extends Component{
    constructor(props){
      super(props);
    }
    render(){
      var mView = (
        <LoadingServeLayout></LoadingServeLayout>
      );
      return mView;
    }
}
