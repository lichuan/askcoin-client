import React, {Component} from "react";

import {View, Text, StyleSheet, Alert, Image} from "react-native";

import Menu, {MenuOptions, MenuContext, MenuOption, MenuTrigger} from "react-native-menu";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devWidth, devHeight, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor} from "../../../style/color.js";
//line
import {LineGreyView} from "../../../base/widget/line.js";
//ip地址
const ips = ["www.baidu.com", "www.google.com"];
//下拉图片的
const arrwImg = require('../resImg/icon_arrow_bottom.png');

//布局文件，定义
export default class LoadingServerActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ip: "0"
    };
  }
  setIp(ip) {
    this.setState({ip})
  }

  render() {
    var mView = (
      <View>
        <MenuContext ref="MenuContext">
          <View style={[styles.root, styles.bk]}>
            <View style={[styles.titlePart, styles.bk]}>
              <Text style={[fontstyles.mainTextSize]}>请选择api节点服务器</Text>
            </View>
            <View style={[styles.menuPart, styles.bk]}>
              <Menu onSelect={this.itemOnSelect} style={[styles.bk, styles.menu]}>
                <MenuTrigger style={[styles.menuTrigger]}>
                  <View style={[styles.facustrRoot]}>
                    <Text style={[fontstyles.mainTextSize]}>{this.state.ip}</Text>
                  </View>
                  <LineGreyView></LineGreyView>
                  <View style={[styles.arrorwRoot]}>
                    <Image style={[styles.arrowBottom]} source={arrwImg}/>
                  </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={[styles.optionsContainerStyle]}>
                  <MenuOption value={ips[0]} style={[styles.optionsValue]}>
                    <Text>{ips[0]}</Text>
                  </MenuOption>
                  <LineGreyView></LineGreyView>
                  <MenuOption value={ips[1]} style={[styles.optionsValue]}>
                    <Text>{ips[1]}</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>
            </View>
          </View>
        </MenuContext>
      </View>
    );
    return mView;
  }

  itemOnSelect = (value) => {
    console.log("当前选择的项目:---", value);
    this.setIp(value);
  }
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  titlePart: {
  },
  menuPart: {
    marginTop: getAdapterSize(10)
  },
  menu: {
    width: devWidth / 1.8
  },
  menuTrigger: {
    flexDirection: "row",
    height: devHeight / 18,
    alignItems: "stretch",
    borderWidth: 1,
    borderColor: borderBgColor
  },
  optionsContainerStyle: {
    position:'absolute',
    left: 0,
    marginTop: devHeight / 18 + getAdapterSize(2),
    width: devWidth / 1.8,
    justifyContent: 'space-around',
    borderColor: borderBgColor,
    borderWidth: getAdapterSize(2)
  },
  optionsValue: {
    flex: 1,
    alignSelf: "center"
  },
  facustrRoot: {
    flex: 1,
    margin: getAdapterSize(3),
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-around"

  },
  arrorwRoot: {
    flexDirection: "row",
    width: getAdapterSize(30),
    alignItems: 'center',
    justifyContent: "space-around"
  },
  arrowBottom: {
    width: getAdapterSize(20),
    height: getAdapterSize(20)
  },
  bk: {
    borderColor: "red",
    borderWidth: 0
  }
});
