import React,{ Component } from "react";

import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

//引入logo,View控件
import LogoView from "../ui/loginLogoview.js";

//欢迎界面的图标
const icon_welcom = require("../resImg/icon_welcom.png");

//欢迎界面的布局
export default class WelcomeLayout extends Component{
  render(){
    let mView =
        (<View style={{flex:1,}}>
          <View style={[styles.bk,styles.logo,{flex:2.6,paddingTop:10}]}>
            <LogoView></LogoView>
          </View>
          <View style={[{flex:7.5},styles.bk,styles.img]}>
            <Image source={icon_welcom} style={[{width:200,height:300}]}></Image>
          </View>
         </View>);
    return mView;
  }
}

//
const styles = StyleSheet.create({
    logo:{
      alignSelf:"center",
      justifyContent:"center",
      alignItems:"center"
    },
    img:{
      alignItems:"center"
    },
    bk:{
      borderWidth:0,
      borderColor:"red",
    }
});
