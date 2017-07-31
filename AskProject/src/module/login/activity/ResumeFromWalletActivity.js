//从钱包恢复
import React, {Component} from "react";

import {View, Text, StyleSheet, BackHandler} from "react-native";

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
//布局文件
import ResumeFromBackupLayout from "../layout/activity_resume_wallet.js";

export default class ResumeWalletActivity extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static navigationOptions = {
    header: null
  };
  initProps() {
    this.navigate = this.props.navigation.navigate;
    this.goBack = this.props.navigation.goBack;
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <ResumeFromBackupLayout></ResumeFromBackupLayout>
      </View>
    );
    return mView;
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentDidUnMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this._timer && clearTimeout(this._timer);
  }
  //返回键
  onBackPress = () => {
    // console.log("按back键");
    this.goBack();
    return true;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
