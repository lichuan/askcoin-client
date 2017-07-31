import React, {Component} from "react";

import {ScrollView, View, Text, Image, StyleSheet} from "react-native";

//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//欢迎界面的图标
const icon_welcom = require("../resImg/icon_welcom.png");

//欢迎界面的布局
export default class WelcomeLayout extends Component {
  render() {
    let mView = (
      <View style={[styles.root]}>
        <View style={[styles.bk, styles.logo]}>
          <LogoView></LogoView>
        </View>
        <View style={[styles.bk, styles.imgRoot]}>
          <Image source={icon_welcom} style={[styles.img]}></Image>
        </View>
      </View>
    );
    return mView;
  }
}

//
const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  logo: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  imgRoot: {
    flex: 6,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  img: {
    width: devWidth - devWidth / 3,
    height: devHeight/2,
  },
  bk: {
    borderWidth: 0,
    borderColor: "red"
  }
});
