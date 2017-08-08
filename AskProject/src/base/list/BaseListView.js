import React, {Component} from "react";

import {View, Text, StyleSheet, FlatList} from "react-native";

//字体
import {fontstyles} from "../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../style/dimens.js";
//颜色
import {borderBgColor} from "../../style/color.js";
//dialog
import ProgressDialog from "../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../base/widget/Toast.js"
//listView基本类
export default class BaseListView extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    data: []
  };
  getData() {
    return this.props.data;
  }
  //{"item":{"key":2,"title":"2"},"index":2,"separators":{}}
  bindView = (item) => {
    return (
      <View></View>
    );
  }
  itemSeparatorComponent = () => {
    var mView = (
      <View></View>
    );
    return (mView);
  }
  componentWillMount() {}
  render() {
    console.log("BaseListView--data--数据:", this.getData());
    var mView = (
      <View style={[styles.root]}>

        <FlatList ref="list" data={this.getData()} renderItem={this.bindView} ItemSeparatorComponent={this.itemSeparatorComponent}/>

      </View>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});
