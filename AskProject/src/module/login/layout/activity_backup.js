import React, {Component} from "react";

import {View, Text, StyleSheet} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi, devHeight, devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor, btnBgColor} from "../../../style/color.js";
//btn
import ButtonView from "../../../base/widget/btn/ButtonView.js";
//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";

const tips = "恭喜，注册成功";
const warningText = "请务必牢记你的密码，并备份好你的钱包文件，否则你的资金可能永远丢失";

//定义备份的layout
export default class BackUpLayout extends Component {
  constructor(props) {
    super(props);
    this.initProps();
  }
  static defaultProps() {
    btnBackUpClick : () => {}
  };
  initProps() {
    //备份相应事件
    this.btnBackUpClick = this.props.btnBackUpClick;
  }
  render() {
    var mView = (
      <View style={[styles.root]}>
        <View style={[styles.part_one, styles.bk]}>
          <LogoView></LogoView>
        </View>
        <View style={[styles.part_two, styles.bk]}>
          <View style={[styles.part_two_one]}>
            <View style={[styles.tipsTextRoot]}>
              <Text style={[styles.tipsText]}>{tips}</Text>
            </View>
            <View style={[styles.warnTextRoot]}>
              <Text style={[styles.warnText]}>{warningText}</Text>
            </View>
          </View>
          <View style={[styles.part_two_two]}>
            <View style={[styles.btnRoot, styles.bk]}>
              <ButtonView text="备份钱包" textSize={getAdapterSize(15)} bgColor={btnBgColor} onClick={this.btnBackUpClick}></ButtonView>
            </View>
          </View>
        </View>
      </View>
    );
    return mView;
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: getAdapterSize(20),
    marginBottom: getAdapterSize(20)
  },
  part_one: {
    flex: 1.5
  },
  part_two: {
    flex: 3,
    alignItems: "center"
  },
  part_two_one: {
    flex: 1
  },
  part_two_two: {
    flex: 1
  },
  tipsTextRoot: {
    marginTop: getAdapterSize(20)
  },
  warnTextRoot: {
    marginTop: getAdapterSize(20),
    width: devWidth - devWidth / 2
  },
  btnRoot: {
    height: devHeight / 14,
    width: devWidth / 3
  },
  tipsText: {
    fontSize: getAdapterSize(20),
    textAlign: 'center'
  },
  warnText: {
    fontSize: getAdapterSize(14),
    fontStyle: "italic",
    textAlign: 'center',
    fontWeight: '300',
    color: 'rgb(205,209,218)',
    //  fontFamily: 'serif',
  },
  bk: {
    borderColor: "red",
    borderWidth: 0
  }

});
