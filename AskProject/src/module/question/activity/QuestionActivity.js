import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
//基本控件
import BaseComponent from "../../../base/activity/BaseComponent.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor} from "../../../style/color.js";
//dialog
import ProgressDialog from "../../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../../base/widget/Toast.js"

import QuestionLayout from "../layout/QuestionLayout.js";

export default class QuestionActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  getListData(){
    return this.state.data;
  }
  componentWillMount() {
    var data = [];
    for(var i = 0;i<10;i++){
      data.push({
        key: i,
        name:"user"+i,
        content:"周末的时候，请问有没有同学准备一起去，北京的郊外进行拓展活动，然后需要注意哪些问题--"+i,
        score:100+i*10,
      });
    }
    this.setState({data});
  }
  render() {
    var mView = (
      <View style={stylesActivity.root}>
        <QuestionLayout data={this.getListData()}/>
      </View>
    );
    return mView;
  }

}

const stylesActivity = StyleSheet.create({
  root:{
    flex:1,
  }
});
