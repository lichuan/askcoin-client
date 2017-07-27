import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";
//引入选择服务器view控件
import IPSelectView from "../ui/ipaddressspinnerview.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//类型
const styles = StyleSheet.create({
  root: {
    flex: 1,
    // alignItems: "center",
    // justifyContent:"center",
  },
  logo: {
    flex: 3,
    alignItems: "center",
    justifyContent:"center",
  },
  serverIp: {
    flex: 2,
    alignItems: "center",
    justifyContent:"center",
  },
  wallet: {
    flex: 3,
    alignItems: "center",
    justifyContent:"center",
  },
  selectBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D1EEEE"
  },
  bk: {
    borderColor: "red",
    borderWidth: 1
  }
});

export default class LoadingServeLayout extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.logo, styles.bk]}>
          <LogoView></LogoView>
        </View>
        <View style={[styles.serverIp, styles.bk]}>
            <IPSelectView></IPSelectView>
        </View>
        <View style={[styles.wallet, styles.bk]}>
          <TouchableOpacity style={[styles.selectBtn]}>
            <Text style={[fontstyles.mainTextSize]}>{"进入问答社区"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return mView;
  }
}
