
/**
自定义的一个组件，登陆模块的logo
**/
import React,{ Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet
} from "react-native";

//登陆的logo
const icon_login_logo = require('../resImg/icon_login_logo.png');
const str_one = "ask anyone, anything,";
const str_two = "from anywhere";


//输出的view
export default class LoginTagView extends Component{
    render(){
      let mView =
          (<View style={[styles.root]}>
            <Image source={icon_login_logo} style={[styles.bk,styles.img]}></Image>
            <View style={[styles.text]}>
                <Text style={[styles.font14]}>{str_one}</Text>
                <Text style={[styles.font14]}>{str_two}</Text>
            </View>
          </View>);
      return mView;
    }
}

const styles = StyleSheet.create({
  root:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
  },
  img:{
    alignItems:"center",
    justifyContent:"center",
    width:80,
    height:80,
  },
  text:{
    marginTop:10,
    alignItems:"center",
  },
  font14:{
    fontSize:15,
  },
  bk:{
    borderWidth:0,
    borderColor:"red"
  }

});
