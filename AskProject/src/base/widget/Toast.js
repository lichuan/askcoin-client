import React, {Component} from "react";

import {View, Text, StyleSheet, Modal} from "react-native";

import Toast from 'react-native-root-toast';

//字体
import {fontstyles} from "../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../style/dimens.js";
//颜色
import {borderBgColor} from "../../style/color.js";
///Users/licheng/ws/rn/waibao/askcoin-client/AskProject
import ModalView from "./ModalView.js";
//自定义toastView
export default class ToastComponent extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps = {
    //显示内容
    content: "你好",
    //位置
    position: devHeight - devHeight / 5
  };
  initProps() {
    //内容
    this.content = this.props.content;
    //弹窗的位置
    this.position = this.props.position;
    //是否显示
    this.visibleTs = this.props.visibleTs;
  }
  render() {
    var mToast = (
      <Toast visible={this.visibleTs} position={this.position} shadow={false} animation={false} hideOnPress={true}>{this.content}</Toast>
    );
    var mView = (
      <ModalView visible={true}>
        <View style={[styles.toast]}>
          {mToast}
        </View>
      </ModalView>

    );
    return mToast;
  }
}

const styles = StyleSheet.create({
  toast: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

//展现toast
export function toastShow({
  content,
  duration = Toast.durations.SHORT,
  backgroundColor = "black",
  shadowColor = "black",
  textColor = "white",
  hideOnPress=false,
  delay = 0,
  onShow = () => {},
  onShown = () => {},
  onHide = () => {},
  onHidden = () => {}
}) {
  let toast = Toast.show(content, {
    duration: duration,
    position: devHeight - devHeight / 5,
    shadow: true,
    shadowColor:shadowColor,
    textColor:textColor,
    animation: true,
    backgroundColor: backgroundColor,
    hideOnPress: hideOnPress,
    delay: delay,
    onShow: onShow,
    onShown: onShown,
    onHide: onHide,
    onHidden: onHidden
  });
  return toast;
}
//隐藏toast
export function toastHidden(toast) {
  Toast.hide(toast);
}
