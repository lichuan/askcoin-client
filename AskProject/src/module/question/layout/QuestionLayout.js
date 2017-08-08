import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
//基本控件
import BaseComponent from "../../../base/activity/BaseComponent.js";
//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor,activeColorHome} from "../../../style/color.js";
//dialog
import ProgressDialog from "../../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../../base/widget/Toast.js"
//抢答的list
import QDListView from "../adapter/QDListView.js";
import ButtonView from "../../../base/widget/btn/ButtonView.js";

const btnText = "抢答";
//导出布局
export default class QuestionLayout extends BaseComponent {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    data: []
  };
  initView() {
    this.setHeadVisible(true);
  }
  getListData() {
    return this.props.data;
  }
  drawHeader() {
    //中间
    var mCenter = {
      centerVisible: true,
      imgSource: require('../../../res/img/icon_login_logo.png'),
    };
    this.setcenterHeadState(mCenter);
    //右边
    var mRight = {
      rightVisible: true,
      tvTop:"myusername",
      tvBottom:"余额：3000",
      textColor:activeColorHome,
    };
    this.setrightHeadState(mRight);

  }
  drawMainView() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.btnRoot]}>
          <ButtonView text={btnText} bgColor={activeColorHome}></ButtonView>
        </View>
        <View style={[styles.listRoot]}>
          <QDListView data={this.getListData()}/>
        </View>
      </View>
    );
    this.setMainView(mView);
  }
  drawRootStyle(){
    return {
      paddingLeft:devWidth/30,
      paddingRight:devWidth/30,
      backgroundColor:"#fff"
    }
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignSelf:"center",
  },
  btnRoot:{
    height:devHeight/20,
    flexDirection:'row',
    width:devWidth/4,
  },
  listRoot:{
    flex:1,
    alignItems:"center",
    borderColor:borderBgColor,
    borderWidth:getAdapterSize(1),
    marginTop:getAdapterSize(2),
  },
  bk:{

  }
});
