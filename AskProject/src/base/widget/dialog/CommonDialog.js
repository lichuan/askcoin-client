import React, {Component} from "react";

import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor,btnBgColor} from "../../../style/color.js";
//dialog
import ProgressDialog from "../pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../Toast.js"
//
import ModalView from "../ModalView.js";

//设置备份
export default class CommonDialog extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps = {
    mainView: (
      <View></View>
    ),
    onLeftClick: () => {},
    onRightClick: () => {},
    leftText: "取消",
    rightText: "确定",
    titleText: ""
  }
  initProps() {
    this.mainView = this.props.mainView;
    this.onLeftClick = this.props.onLeftClick;
    this.onRightClick = this.props.onRightClick;
    this.leftText = this.props.leftText;
    this.rightText = this.props.rightText;
    this.titleText = this.props.titleText;
  }
  render() {
    var mView = (
      <ModalView >
        <View style={[styles.modal]}>
          <View style={[styles.root]}>
            <View style={[styles.partTop, styles.bk]}>
              <Text>{this.titleText}</Text>
            </View>
            <View style={[styles.partMain]}>
              <View>{this.mainView}</View>
            </View>
            <View style={[styles.partBottom, styles.bk]}>
              <View style={[styles.bk]}>
                <TouchableOpacity style={[styles.touch]} onPress={this.onLeftClick}>
                  <Text style={[styles.text]}>{this.leftText}</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.bk]}>
                <TouchableOpacity style={[styles.touch]} onPress={this.onRightClick}>
                  <Text style={[styles.text]}>{this.rightText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

      </ModalView>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  root: {
    justifyContent: 'center',
    alignItems: "center",
    marginTop: devHeight / 10,
    marginLeft: (devWidth / 3) / 2,
    marginRight: (devWidth / 3) / 2,
    borderColor: borderBgColor,
    borderWidth: 1,
    backgroundColor: "white",
  },
  partTop: {
    // flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    height: devHeight / 12,
    width: devWidth - (devWidth / 3)
  },
  partMain: {
    width: devWidth - (devWidth / 3),
    borderColor: borderBgColor,
    borderWidth: (0, 1, 0, 1)
  },
  partBottom: {
    width: devWidth - (devWidth / 3),
    height: devHeight / 11,
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  touch: {
    width: devWidth / 5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: getAdapterSize(5),
    paddingBottom: getAdapterSize(5),
    backgroundColor:btnBgColor,
  },
  text: {
    fontSize: 15
  },
  bk: {
    borderColor: 'red',
    borderWidth: 0
  }
});
