

import React,{ Component } from "react";

import {
  View,
  Text,
  StyleSheet,
} from "react-native";

//灰色line
export  class LineGreyView extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var mView = (
      <View style={[styles.lineGrey]}></View>
    );
    return mView;
  }
}

const styles = StyleSheet.create({
  lineGrey:{
    borderWidth:0.6,
    borderColor:"#ccc",
  }
});
