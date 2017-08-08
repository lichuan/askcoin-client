/**
这个是含有3个
 **/
import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor,btnBgColor,activeColorHome} from "../../../style/color.js";


//导出
export default class ThreeTvItemView extends Component {

  constructor(props) {
    super(props);
  }
  static defaultProps = {
    title: "",
    content: "",
    actionConten: "",
    actionEvent: () => {}
  };
  getTitle() {
    return this.props.title;
  }
  getContent() {
    return this.props.content;
  }
  getActionContent() {
    return this.props.actionConten;
  }
  //相应事件
  actionEventClick = () => {
    this.props.actionEvent;
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.twoRoot]}>
          <View style={[styles.two_1View]}>
            <Text style={[styles.contentText]}>{this.getTitle()}：{this.getContent()}</Text>
          </View>
          <View style={[styles.two_2View]}>
            <TouchableOpacity style={[styles.btnTouch]} onPress={this.actionEventClick}>
              <Text style={styles.btnText}>{this.getActionContent()}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center"
  },
  twoRoot: {
    marginLeft:getAdapterSize(5),
    marginRight:getAdapterSize(5),
  },
  two_1View: {},
  two_2View: {
    alignItems: "flex-end",
    marginTop:getAdapterSize(5),
  },
  btnTouch:{
    backgroundColor:btnBgColor,
    paddingTop:getAdapterSize(5),
    paddingBottom:getAdapterSize(5),
    paddingLeft:getAdapterSize(10),
    paddingRight:getAdapterSize(10),
  },
  contentText:{
    fontSize:14,
    color:activeColorHome,
  },
  btnText:{
    fontSize:12,
  }
});
