import React, {Component} from "react";

import {View, Text, StyleSheet, TextInput} from "react-native";

//line
import {LineGreyView} from "../../../base/widget/line.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor} from "../../../style/color.js";
//变量
const tips_one = "新用户注册";
const accoutName = "用户名:";
const passwordName = "密码:";
const confirmName = "确认密码:";

//注册输入
export default class InputRegisterView extends Component {
  constructor(props) {
    super(props);
    this.focus = this.props.focus;
    this.state = {
      username: "",
      pwd: "",
      repwd: ""
    }
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.title, styles.bk]}>
          <Text>{tips_one}</Text>
        </View>
        <View style={[styles.content, styles.bk]}>
          <View style={[styles.nameRootContent]}>
            <View style={[styles.nameTv, styles.bk]}>
              <Text style={[fontstyles.mainTextSize]}>{accoutName}</Text>
            </View>
            <View style={[styles.nameEdit, styles.bk]}>
              <TextInput ref="ed_userName" style={[styles.inputText]}  onFocus={this.focus} onChangeText={this.onChangeAccount} placeholder="请输入账号" underlineColorAndroid='transparent'></TextInput>
            <LineGreyView style={[styles.line]}></LineGreyView>
            </View>
          </View>
          <View style={[styles.nameRootContent]}>
            <View style={[styles.nameTv, styles.bk]}>
              <Text style={[fontstyles.mainTextSize]}>{passwordName}</Text>
            </View>
            <View style={[styles.nameEdit, styles.bk]}>
              <TextInput ref="ed_Pwd" style={[styles.inputText]} onFocus={this.focus} onChangeText={this.onChangePwd} password={true} placeholder="请输入密码" underlineColorAndroid='transparent'></TextInput>
              <LineGreyView></LineGreyView>
            </View>
          </View>
          <View style={[styles.nameRootContent]}>
            <View style={[styles.nameTv, styles.bk]}>
              <Text style={[fontstyles.mainTextSize]}>{confirmName}</Text>
            </View>
            <View style={[styles.nameEdit, styles.bk]}>
              <TextInput ref="ed_RePwd" style={[styles.inputText,styles.bk]} onFocus={this.focus} onChangeText={this.onChangeRepeatPwd} password={true} placeholder="请确认密码" underlineColorAndroid='transparent'></TextInput>
              <LineGreyView></LineGreyView>
            </View>
          </View>
        </View>
      </View>
    );
    return mView;
  }
  //姓名input监听
  onChangeAccount = (name) => {
    this.setState({username: name});
  }
  //密码输入监听
  onChangePwd = (pwd) => {
    this.setState({pwd: pwd});
  }
  //重复密码，输入监听
  onChangeRepeatPwd = (repwd) => {
    this.setState({repwd: repwd});
  }
}

//样式
const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: getAdapterSize(300),
    alignSelf: "center",
    borderWidth: 1,
    borderColor: borderBgColor,
  },
  title: {
    flex: 0.7,
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop:getAdapterSize(20),
  },
  content: {
    marginBottom: getAdapterSize(20),
    flex: 4,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  nameRootContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  nameTv: {
    flex: 1.8,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  nameEdit: {
    flex: 3,
    marginLeft: getAdapterSize(5),
    marginRight: getAdapterSize(5),
  },
  inputText:{
    paddingTop:0,
    paddingBottom:0,
    fontSize:getAdapterSize(14),
  },
  bk: {
    borderColor: "green",
    borderWidth: 0,
  }
});
