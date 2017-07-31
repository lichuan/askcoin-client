import React,{Component} from "react";

import {
  StyleSheet,
  View,
  Text
} from "react-native";

export default class FlexTest extends Component{
      render(){
        var mView =
            (<View style={[styles.margginBox]}>
                <View style={[styles.box,styles.height400,styles.width400]}>
                    <View style={[styles.top,styles.height50,styles.bgred]}>
                      <Text style={[styles.yellow]}>top</Text>
                    </View>
                    <View style={[styles.borderBox]}>
                      <View style={[styles.left,styles.bgred]}>
                        <Text style={[styles.yellow]}>left</Text>
                      </View>
                      <View style={[styles.right,styles.bgred]}>
                        <Text style={[styles.yellow]}>right</Text>
                      </View>
                    </View>
                    <View style={[styles.bottom,styles.height50,styles.bgred]}>
                      <Text style={[styles.white]}>bottom</Text>
                    </View>
                </View>
            </View>);
        return mView;
      }
}

const styles = StyleSheet.create({
    margginBox:{
      paddingLeft:7,
      paddingRight:7,
      position:"absolute",
    },
    box:{
      position:"relative",
      flex:1
    },
    top:{
      justifyContent:"center",
      alignItems:"center",
    },
    borderBox:{
      flexDirection:"row",
      flex:1,
      justifyContent:"space-between",
    },
    left:{
      width:50,
      justifyContent:"center",
      alignItems:"center",
    },
    right:{
      width:50,
      justifyContent:"center",
      alignItems:"center",
    },
    bottom:{
      justifyContent:"center",
      alignItems:"center",
    },
    height400:{
      height:400,
    },
    height40:{
      height:40,
    },
    height50:{
      height:50,
    },
    width400:{
      width:370,
    },
    bgred:{
      backgroundColor:"#6AC5AC"
    },
    yellow:{
      color:"#FDC72F",
      fontWeight:"900",
    }

});
