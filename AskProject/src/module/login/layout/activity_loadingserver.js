import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";
//引入选择服务器view控件
import IPSelectView from "../ui/ipaddressspinnerview.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor, btnBgColor} from "../../../style/color.js";
export default class LoadingServeLayout extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps = {
    onEnterCommunicationClick:()=>{},
  }
  initProps(){
      this.onEnterCommunicationClick = this.props.onEnterCommunicationClick;
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.logo, styles.bk]}>
          <LogoView></LogoView>
        </View>
        <View style={[styles.partTwo]}>
          <View style={[styles.serverIp, styles.bk]}>
              <IPSelectView></IPSelectView>
          </View>
          <View style={[styles.wallet, styles.bk]}>
            <TouchableOpacity style={[styles.selectBtn]} onPress={this.onEnterCommunicationClick}>
              <Text style={[fontstyles.mainTextSize]}>{"进入问答社区"}</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
    return mView;
  }


}

//类型
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  logo: {
    flex: 3,
    alignItems: "center",
    justifyContent:"center",
  },
  partTwo:{
    flex: 6,
  },
  serverIp: {
    flex: 2,
    alignItems: "center",
    justifyContent:"center",
  },
  wallet: {
    flex: 5,
    flexDirection:"row",
    alignItems: "center",
    justifyContent:"space-around",
  },
  selectBtn: {
    width:devWidth/2,
    height:devHeight/16,
    backgroundColor: btnBgColor,
    alignItems: "center",
    justifyContent:"space-around",
  },
  bk: {
    borderColor: "red",
    borderWidth: 0,
  }
});
