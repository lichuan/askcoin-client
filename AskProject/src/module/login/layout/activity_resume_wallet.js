import React, {Component} from "react";

import {View, Text, StyleSheet, ScrollView, TextInput} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor, btnBgColor} from "../../../style/color.js";
//btn
import ButtonView from "../../../base/widget/btn/ButtonView.js";
import {LineGreyView} from "../../../base/widget/line.js";
//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";

const please_tips = "请输入钱包密码";
const pwdTitle = "密码：";
const selectWalletText = "选择钱包文件";
const startResumeText = "开始恢复";
//恢复布局
export default class ResumeFromBackupLayout extends Component {
  render() {
    var mView = (
      <ScrollView style={[styles.scroll]}>
        <View style={[styles.root]}>
          <View style={[styles.partOne, styles.bk]}>
            <LogoView></LogoView>
          </View>
          <View style={[styles.partTwo, styles.bk]}>
            <View style={[styles.btnRoot, styles.bk]}>
              <ButtonView text={selectWalletText}></ButtonView>
            </View>
            <View style={[styles.inputTipsRoot, styles.bk]}>
              <Text>{please_tips}</Text>
            </View>
            <View style={[styles.inputContentRoot, styles.bk]}>
              <View style={[styles.pwdTitle]}>
                <Text style={[styles.text]}>{pwdTitle}</Text>
              </View>
              <View style={[styles.pwdInput]}>
                <TextInput ref="name" style={[styles.text]} onChangeText={this.onChangeName} placeholder="请输入钱包名" underlineColorAndroid='transparent'></TextInput>
                <LineGreyView></LineGreyView>
              </View>
            </View>
            <View style={[styles.btnRoot, styles.bk]}>
              <ButtonView text={startResumeText}></ButtonView>
            </View>
          </View>
        </View>
      </ScrollView>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1
  },
  root: {
    flex: 1,
    marginTop: devHeight / 15,
    marginBottom: devHeight / 15
  },
  partOne: {},
  partTwo: {
    height: devHeight / 2,
    marginTop: devHeight / 15
  },
  btnRoot: {
    height: (devHeight / 2) / 8,
    justifyContent: "center",
    alignItems: 'center',
    alignSelf: 'center',
    width: (devWidth - devWidth / 2)
  },
  inputTipsRoot: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: devHeight / 20,
    marginBottom: devHeight / 20
  },
  inputContentRoot: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: devHeight / 20,
    marginLeft:devWidth/7,
    marginRight:devWidth/7,
  },
  pwdTitle:{
    flex:1.2,
    flexDirection:'row',
    justifyContent:'flex-end',
  },
  pwdInput:{
    flex:5,
    justifyContent:'space-between',
  },
  text:{
    fontSize:getAdapterSize(15),
  },
  bk: {
    borderColor: "red",
    borderWidth: 0,
  }
});
