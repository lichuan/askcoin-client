import React, {Component} from "react";

import ReactNative, {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";

//引入registerView
import RegisterInputView from "../ui/inputregisterview.js";
//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";
//适配
import {devDpi, getAdapterSize} from "../../../style/dimens.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//
export default class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps = {
    onBtnRegisterClick:()=>{},
    onBtnResumeWalletClick:()=>{},
  }
  initProps(){
    this.onBtnRegisterClick = this.props.onBtnRegisterClick;
    this.onBtnResumeWalletClick = this.props.onBtnResumeWalletClick;
  }
  render() {
    var mView = (
      <ScrollView contentContainerStyle={styles.root} ref="scroll">
        <View>
          <View style={[styles.part_one, styles.bk]}>
            <LogoView></LogoView>
          </View>
          <View style={[styles.part_two, styles.bk]}>
            <View>
              <RegisterInputView ref="registerView" focus={this.onFocuseOperate}></RegisterInputView>
            </View>
          </View>
          <View style={[styles.part_three, styles.bk]}>
            <View style={[styles.btnRoot, styles.bk]}>
              <TouchableOpacity style={[styles.btnTouchTop,styles.btnLeft]} onPress={this.onBtnRegisterClick}>
                <Text style={[fontstyles.mainTextSize]}>注 册</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.btnRoot, styles.bk]}>
              <TouchableOpacity style={[styles.btnTouchTop,styles.btnRight]} onPress={this.onBtnResumeWalletClick}>
                <Text style={[fontstyles.mainTextSize]}>从钱包恢复</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    );
    return mView;
  }


  onFocuseOperate = (e) => {}

}
const styles = StyleSheet.create({
  root: {
    justifyContent: "space-between",
    alignItems: "center"
  },
  part_one: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: getAdapterSize(40),
    paddingBottom: getAdapterSize(20)
  },
  part_two: {
    height: getAdapterSize(260),
    justifyContent: "space-around",
    alignItems: "center"
  },
  part_three: {
    height: getAdapterSize(100),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  btnRoot: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch"
  },
  btnTouchTop: {
    // flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccc",
    paddingTop: getAdapterSize(10),
    paddingBottom: getAdapterSize(10)
  },
  btnLeft:{
      marginRight: getAdapterSize(30),
  },
  btnRight:{
    marginLeft: getAdapterSize(30),
  },
  bk: {
    borderWidth: 0,
    borderColor: "red"
  }
});
