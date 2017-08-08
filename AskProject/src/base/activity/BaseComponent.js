import React, {Component} from "react";

import {View, Text, StyleSheet} from "react-native";

//引入头部
import Head from "./header/BaseHeader.js";

//基本类型
export default class BaseComponent extends Component {

  constructor(props) {
    super(props);
    this.headVisible = false;
    this.mainView = null;
    this.state = {
      centerHeadState: null,
      leftHeadState: null,
      rightHeadState: null
    };
    this.initView();
  }
  initView() {}
  setHeadVisible(headVisible) {
    this.headVisible = headVisible;
  }
  getHeadVisible() {
    return this.headVisible;
  }
  //设置左边的head
  setleftHeadState({
    leftVisible = false
  } = {}) {
    var props = {
      leftVisible: leftVisible
    }
    this.state.leftHeadState = props;
  }
  //获得左边的head
  getleftHeadState() {
    return this.state.leftHeadState;
  }
  //设置中间的head
  setcenterHeadState({
    centerVisible = false,
    tvText = "",
    imgSource = null,
    onClick = () => {}
  } = {}) {
    var centerHeadState = {
      centerVisible: centerVisible,
      centerProps: {
        tvText: tvText,
        imgSource: imgSource,
        onClick: onClick
      }
    };
    this.setState({centerHeadState});
  }
  //获得中间的head
  getcenterHeadState() {
    return this.state.centerHeadState;
  }
  //设置右边的head
  setrightHeadState({
    tvText = "",
    imgSource = null,
    tvTop = "",
    tvBottom = "",rightVisible=false,textColor="black",
    onClick = () => {}
  } = {}) {
    var props = {
      rightVisible:rightVisible,
      rightProps:{
        tvText: tvText,
        imgSource: imgSource,
        tvDouble: {
          tvTop: tvTop,
          tvBottom: tvBottom
        },
        onClick: onClick,
        textColor:textColor,
      }
    }

    this.state.rightHeadState = props;
  }
  //获得右边的head
  getrightHeadState() {
    return this.state.rightHeadState;
  }
  setMainView(view) {
    this.mainView = view
  }
  getMainView() {
    return this.mainView;
  }
  //中间title的参数
  settingCenterTitle({tvText, imgSource, onClick}) {}
  //绘制头部header
  drawHeader() {}
  //绘制Mainview
  drawMainView() {}
  drawRootStyle(){
    return {}
  }
  componentWillMount() {
    if (this.getHeadVisible()) {
      this.drawHeader();
    }
    this.drawMainView();
  }
  render() {

    //头部文件
    if (this.getHeadVisible()) {
      //
      var leftHeadState = this.getleftHeadState();
      var centerHeadState = this.getcenterHeadState();
      var rightHeadState = this.getrightHeadState();
      var headerView = (
        <View>
          <Head {...rightHeadState} {...centerHeadState} {...leftHeadState} ></Head>
        </View>
      );
    }
    //主view
    var mView = (
      <View style={[styleBase.root,this.drawRootStyle()]}>
        {this.getHeadVisible() &&<View style = {[styleBase.head, styleBase.bk]}>{
        headerView
        }</View>}
        <View style={[styleBase.main, styleBase.bk]}>{this.getMainView()}</View>
      </View>
    );
    return mView;
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
}
const styleBase = StyleSheet.create({
  root: {
    flex: 1
  },
  head: {
    flex: 1
  },
  main: {
    flex: 8
  },
  bk: {
    borderColor: "red",
    borderWidth: 0
  }
});
