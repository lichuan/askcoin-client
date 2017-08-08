
import React, {Component} from "react";

import {View, Text, StyleSheet} from "react-native";

import {devHeight, devWidth, devDpi, getAdapterSize} from "../../../style/dimens.js"
// import {LineGreyView} from "../../widget/line.js"
//引入右边部分的head
import BaseRightHead from "./BaseRightHead.js";
//引入中间部分的head
import BaseCenterHead from "./BaseCenterHead.js";
//header高度
const varHight = devHeight / 9;
//头部
export default class BaseHeader extends Component {

  constructor(props) {
    super(props);
  }
  static defaultProps = {
    leftVisible: false,
    rightVisible: false,
    rightProps:{
      // tvText: null,
      // imgSource: null,
      // tvDouble: {
      //   tvTop: "",
      //   tvBottom: ""
      // },
      // textColor:
      // onClick: () => {}
    },
    centerVisible: true,
    centerProps: {
      // tvText: "undefine",
      // imgSource:require('./my-icon.png'),
      // onClick: () => {}
    },
  };
  render() {
    //左边head
    var mLeftView = null;
    //中间title
    var mCenterView = null;
    //右边head
    var mRightView = null;
    if (this.props.leftVisible) {}
    if (this.props.centerVisible) {
      mCenterView = (
        <BaseCenterHead {...this.props.centerProps}></BaseCenterHead>
      );
    }
  console.log("右边的数据111",JSON.stringify(this.props.rightProps));
    if (this.props.rightVisible) {
      var mRightView = (
        <BaseRightHead {...this.props.rightProps}></BaseRightHead>
      );
    }

    var mView = (
      <View>
        <View style={[styles.root,styles.bk]}>
          <View style={[styles.left]}>{this.props.leftVisible && mLeftView}</View>
          <View style={[styles.center,styles.bk]}>{this.props.centerVisible && mCenterView}</View>
          <View style={[styles.right]}>{this.props.rightVisible && mRightView}</View>
        </View>
      </View>

    );
    return mView;
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    height: varHight,
    justifyContent: "space-between",
    alignItems: 'center',
  },
  left: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  right: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bk:{
    borderColor:"red",
    borderWidth:0
  }
});
