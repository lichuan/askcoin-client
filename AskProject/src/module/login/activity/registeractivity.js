import React, {Component} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Alert
} from "react-native";
import {StackNavigator} from "react-navigation";
//注册
import RegisterLayout from "../layout/activity_register.js";
//dialog
import ProgressDialog from "../../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../../base/widget/Toast.js"
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//注册界面的逻辑
export default class RegisterActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //是否显示dialog
      isVisiblePd: false
    }
    this._timer = null;
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
    var pdView = (
      <View>
        <ProgressDialog></ProgressDialog>
      </View>
    );
    var isVisiblePd = this.state.isVisiblePd;
    var mView = (
      <View>
        <RegisterLayout onBtnRegisterClick={this.onBtnRegisterClick} onBtnResumeWalletClick={this.onBtnResumeWalletClick}></RegisterLayout>
        {isVisiblePd && pdView}
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
  //设置是否显示dialog
  setProgressDialog = (isVisiblePd) => {
    this.setState({isVisiblePd});
  }
  //注册按钮，相应事件
  onBtnRegisterClick = () => {
    this.setProgressDialog(true);
    this.doHttpRegister();
  }
  //从钱包恢复，相应事件
  onBtnResumeWalletClick = () => {
    this.navigate("ResumeFromWallet");
  }
  //返回键
  onBackPress = () => {
    // console.log("按back键");
    this.goBack();
    return true;
  }
  //网络请求,请求注册
  doHttpRegister() {
    console.log("开始注册网络请求");
    this._timer = setTimeout(() => {
      console.log("请求完成");
      this.onHttpSuccessCallback();
    }, 1000 * 1);
  }
  //注册请求成功
  onHttpSuccessCallback() {
    this.setProgressDialog(false);
    this.navigate("Backup");
  }
}

const styles = StyleSheet.create({});
