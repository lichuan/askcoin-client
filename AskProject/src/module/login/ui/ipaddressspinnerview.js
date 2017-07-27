import React, {Component} from "react";

import {View, Text, StyleSheet, Alert, Image} from "react-native";

import Menu, {MenuOptions, MenuContext, MenuOption, MenuTrigger} from "react-native-menu";


//字体
import {fontstyles} from "../../../style/appstyle.js";
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  menu: {
    marginTop: 10
  },
  menuTrigger: {
    borderWidth: 1,
    borderColor: "#ccc",
    width:200,
    height:40,
    flexDirection:"row",
    alignItems:"center"
  },
  optionsContainerStyle: {
    marginTop: 20,
    position:'relative',
    left:2,
    borderColor: '#ccc',
    borderWidth: 2,
    alignItems:"center",
    width: 200,
    height: 100
  },
  facustext: {
    margin:3,
    flex: 3,
    // borderColor: '#ccc',
    // borderWidth: 2,
  },
  arrowBottom: {
    alignSelf: "center",
    width: 20,
    height: 20,
  },
  bk: {
    borderColor: "red",
    borderWidth: 1
  }
});

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
  itemOnSelect = (value) => {
    console.log("当前选择的项目:---", value);
  }
  render() {
    var mView = (
      <View style={[styles.root, styles.bk]}>
        <MenuContext ref="MenuContext">
          <View style={[styles.root]}>
            <Text style={[fontstyles.mainTextSize]}>请选择api节点服务器</Text>
            <Menu onSelect={this.itemOnSelect} style={[styles.menu]}>

                <MenuTrigger style={[styles.menuTrigger]}>
                  <Text style={[styles.facustext,fontstyles.mainTextSize]}>{this.state.ip}</Text>
                  <Image style={[styles.arrowBottom]} source={arrwImg}/>
                </MenuTrigger>

              <MenuOptions optionsContainerStyle={[styles.optionsContainerStyle]}>
                <MenuOption value={ips[0]}>
                  <Text>{ips[0]}</Text>
                </MenuOption>
                <MenuOption value={ips[1]}>
                  <Text>{ips[1]}</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </MenuContext>
      </View>
    );
    return mView;
  }
}
