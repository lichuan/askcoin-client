import React, {Component} from "react";

import {View, Text, StyleSheet,TouchableOpacity} from "react-native";

import {devHeight, devWidth, devDpi, getAdapterSize} from "../../../style/dimens.js"

//右边头部
export default class BaseRightHead extends Component {

  constructor(props) {
    super(props);
  }
  static defaultProps = {
    tvText: null,
    imgSource: null,
    tvDouble: {
      tvTop: "",
      tvBottom: ""
    },
    textColor:"black",
    onClick: () => {}
  };

  render() {
    if (this.props.tvText) {
      var mView = (
        <View style={[styles.root]}>
          <TouchableOpacity onPress={this.onClickEvent}>
            <Text style={[{color:this.props.textColor}]}>{this.props.tvText}</Text>
          </TouchableOpacity>
        </View>
      );
      return mView;
    }
    if (this.props.imgSource) {
      var mView = (
        <View>
          <TouchableOpacity onPress={this.onClickEvent}>
            <ImageView source={this.props.imgSource}></ImageView>
          </TouchableOpacity>
        </View>
      );
      return mView;
    }
    if (this.props.tvDouble.tvTop) {
      var mView = (
        <View>
          <View>
            <TouchableOpacity onPress={this.onClickEvent}>
              <Text style={[{color:this.props.textColor},styles.text]}>{this.props.tvDouble.tvTop}</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.onClickEvent}>
              <Text style={[{color:this.props.textColor},styles.text]}>{this.props.tvDouble.tvBottom}</Text>
            </TouchableOpacity>
          </View>
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
  root:{
    flexDirection:"row",
  },
  text:{
    fontSize:12,
  }
});
