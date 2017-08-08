import React, {Component} from "react";

import {View, Text, StyleSheet} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor} from "../../../style/color.js";
//布局文件
import BackUpLayout from "../layout/activity_backup.js";
//弹出dialog布局
import SettingBackUpDialog from "../layout/activity_settingBackup.js";

export default class BackupActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogVisible: false,
    }
    this.initProps();
  }
  static navigationOptions = {
    header: null
  };
  initProps() {
    this.navigate = this.props.navigation.navigate;
  }
  render() {
    var dialogView = (this.getDialogVisible() && (
      <SettingBackUpDialog onCancleClick={this.ondialogCancleClick} onSureClick={this.ondialogSureClick}></SettingBackUpDialog>
    ));
    var mView = (
      <View style={[styles.root]}>
        <BackUpLayout btnBackUpClick={this.onBackUpBtnClick}></BackUpLayout>
        {dialogView}
      </View>
    );
    return mView;
  }
  //
  setDialogVisible(isDialogVisible) {
    this.setState({isDialogVisible})
  }
  //获取当前dialog的状态
  getDialogVisible() {
    return this.state.isDialogVisible;
  }
  //备份按钮
  onBackUpBtnClick = () => {
    this.navigate("Home");
    // this.setDialogVisible(true);
  }
  // //dialog,取消按钮
  // ondialogCancleClick=()=>{
  //   this.setDialogVisible(false);
  // }
  // ondialogSureClick=()=>{
  //   this.setDialogVisible(false);
  // }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});
