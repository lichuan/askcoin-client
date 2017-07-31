/**
连接服务器的界面
**/
import React,{ Component } from "react";
import {StackNavigator} from "react-navigation";
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
      this.navigate = this.props.navigation.navigate;
    }
    static navigationOptions = {
      header: null
    };
    initProps(){

    }
    render(){
      var mView = (
        <LoadingServeLayout onEnterCommunicationClick={this.onEnterCommunicationClick}></LoadingServeLayout>
      );
      return mView;
    }
    //进入社区
    onEnterCommunicationClick=()=>{
      this.operateNoregister();
    }

    //当没有注册时
    operateNoregister(){
      this.navigate("Register");
    }
}
