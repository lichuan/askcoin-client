import React, {Component} from "react";

import {View, Text, StyleSheet, FlatList} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor,mainBgColor} from "../../../style/color.js";
//dialog
import ProgressDialog from "../../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../../base/widget/Toast.js"
//引入每一项的item
import ItemLayout from "../../../main/layout/adapter/three_tv_item.js";
//listview
import BaseListView from "../../../base/list/BaseListView.js";

export default class QDListView extends BaseListView {
  constructor(props) {
    super(props);
  }

  //{"item":{"key":2,"title":"2"},"index":2,"separators":{}}
  bindView = (item) => {
    console.log(JSON.stringify(item));
    var itemProps = {
      title: item.item.name,
      content: item.item.content,
      actionConten: item.item.score+" 抢答",
      // actionEvent:this.onQDClick(item.index),
    }
    var itemView = (
    <ItemLayout {...itemProps}></ItemLayout>
    );
    return itemView;
  }
  itemSeparatorComponent = ()=>{
    var mView = (
      <View style={[{height:devHeight/180,backgroundColor:"#ffff"}]}></View>
    );
    return mView;
  }
  onQDClick = (index) => {}
}
