import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
import {btnBgColor} from "../../../style/color.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";

//自定义button
export default class ButtonView extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps = {
    onClick: () => {},
    text: "",
    textSize: getAdapterSize(14),
    bgColor: btnBgColor,
    padTop: getAdapterSize(2),
    padBottom: getAdapterSize(2)
  }
  initProps() {
    this.onClick = this.props.onClick;
    this.text = this.props.text;
    this.textSize = this.props.textSize;
    this.bgColor = this.props.bgColor;
    this.padTop = this.props.padTop;
    this.padBottom = this.props.padBottom;
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <TouchableOpacity onPress={this.onClick} style={[
          {
            backgroundColor: this.bgColor,
            paddingTop: this.padTop,
            paddingBottom: this.padBottom
          },
          styles.touch,styles.bk
        ]}>
          <Text style={{
            fontSize: this.textSize
          }}>{this.text}</Text>
        </TouchableOpacity>
      </View>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection:"row",
    justifyContent: "space-around",
  },
  touch: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  bk:{
    borderColor:"red",
    borderWidth:0,
  }
});
