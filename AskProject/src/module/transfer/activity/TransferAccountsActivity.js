import React,{ Component } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

//字体
import {fontstyles} from "../../../style/appstyle.js";
//适配
import {devDpi,devHeight,devWidth, getAdapterSize} from "../../../style/dimens.js";
//颜色
import {borderBgColor} from "../../../style/color.js";
//dialog
import ProgressDialog from "../../../base/widget/pd/ProgressCircleBar.js"
//toast
import ToastComponent, {toastShow} from "../../../base/widget/Toast.js"
export default class TransferAccountsActivity extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var mView = (
      <View>
        <Text>three</Text>
      </View>
    );
    return mView;
  }
}

const styles = StyleSheet.create({

});
