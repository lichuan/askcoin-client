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


export default class HighGradeActivity extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    var mView = (
      <View style={[styles.root]}>
        <Text>暂未开放</Text>
      </View>
    );
    return mView;
  }

}

const styles = StyleSheet.create({
  root:{
    flex:1,
    justifyContent:"center",
    alignItems:'center',
  },
});
