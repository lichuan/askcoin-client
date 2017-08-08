import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity,Image} from "react-native";

import {devHeight, devWidth, devDpi, getAdapterSize} from "../../../style/dimens.js"

//右边头部
export default class BaseCenterHead extends Component {

  constructor(props) {
    super(props);
  }
  static defaultProps = {
    tvText: null,
    imgSource: null,
    onClick: () => {}
  };

  render() {
    if (this.props.tvText) {
      var mView = (
        <View style={[styles.root,styles.bk]}>
          <TouchableOpacity onPress={this.onClickEvent}>
            <Text>aaa</Text>
          </TouchableOpacity>
        </View>
      );
      return mView;
    }
    if (this.props.imgSource) {
      var mView = (
        <View style={[styles.root,styles.bk]}>
          <TouchableOpacity onPress={this.onClickEvent}>
            <Image source={this.props.imgSource} style={[styles.img]}/>
          </TouchableOpacity>
        </View>
      );
      return mView;
    }
    return (<View></View>);
  }

  onClickEvent = () => {
    this.props.onClick();
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
  },
  img:{
    width:getAdapterSize(35),
    height:getAdapterSize(35),
  },
  bk:{
    borderColor:"red",
    borderWidth:0
  }
});
