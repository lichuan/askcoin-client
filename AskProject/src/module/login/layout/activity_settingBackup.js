import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";

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
//
import ModalView from "../../../base/widget/ModalView.js";
import {LineGreyView} from "../../../base/widget/line.js";
//
import CommonDialog from "../../../base/widget/dialog/CommonDialog.js"

//设置备份
export default class SettingBackDialog extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }

  static defaultProps = {
    onCancleClick: () => {},
    onSureClick: () => {}
  };
  initProps() {
    this.onCancleClick = this.props.onCancleClick;
    this.onSureClick = this.props.onSureClick;
  }
  render() {
    var mainView = (
      <SettingBackLayout ></SettingBackLayout>
    );
    var title = "备份钱包";
    var mView = (
      <CommonDialog mainView={mainView} titleText={title} onLeftClick={this.onCancleClick} onRightClick={this.onSureClick}></CommonDialog>

    );
    return mView;
  }
}

class SettingBackLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var mView = (
      <View style={[mainStyles.root]}>
        <View style={[mainStyles.part]}>
          <View style={[mainStyles.titleRoot]}>
            <Text>钱包名：</Text>
          </View>
          <View style={[mainStyles.inputRoot]}>
            <TextInput ref="name" style={[]} onChangeText={this.onChangeName} placeholder="请输入钱包名" underlineColorAndroid='transparent'></TextInput>
            <LineGreyView></LineGreyView>
          </View>
        </View>
        <View style={[mainStyles.part]}>
          <View style={[mainStyles.titleRoot]}>
            <Text>密码：</Text>
          </View>
          <View style={[mainStyles.inputRoot]}>
            <TextInput ref="pwd" style={[]} onChangeText={this.onChangePwd} password={true} placeholder="请输入密码" underlineColorAndroid='transparent'></TextInput>
            <LineGreyView></LineGreyView>
          </View>
        </View>
      </View>
    );
    return mView;
  }
  onChangeName = (name) => {}
  onChangePwd = (pwd) => {}
}
const mainStyles = StyleSheet.create({
  root: {},
  part: {
    height: devHeight / 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center'

  },
  titleRoot: {
    flex: 3.2,
    alignItems: 'flex-end'
  },
  inputRoot: {
    flex: 8,
    justifyContent: "space-around"
  },
  bk: {
    borderColor: "red",
    borderWidth: 0
  }
});
