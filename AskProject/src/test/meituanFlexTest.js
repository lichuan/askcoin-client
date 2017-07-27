import React,{Component} from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

const styles = StyleSheet.create({
  root:{

  },
  part_one:{
    flexDirection:"row",
    height:160,
  },
  part_one_left:{
    flex:4,
    borderWidth:1,
    borderColor:"red",
    justifyContent:"center",
    alignItems:"center",
  },
  part_one_right:{
    flex:6,
    borderWidth:1,
    borderColor:"blue",
    justifyContent:"center",
    alignItems:"center",
  },
  part_one_right_top:{
      flex:2,
      flexDirection:"row"
  },
  part_one_right_bottom:{
      flex:1,
      flexDirection:"row"
  },
  bgred:{
    backgroundColor:"#FF4500",
  },
  bgblue:{
    backgroundColor:"#00FFFF",
  },
  height80:{
    height:80,
  },
  width60:{
    width:60,
  },
  font800:{
    fontWeight:"800",
    fontSize:15,
  },
  jus_ali_center:{
    justifyContent:"center",
    alignItems:"center",
  },
  bk:{
    borderWidth:1,
    borderColor:"red"

  }

});

const img_url_one_left = {uri: 'https://p0.meituan.net/mmc/fe4d2e89827aa829e12e2557ded363a112289.png'};
export default class MeiTuan extends Component{

  render(){
    var mView =
        (<View style={[styles.root]}>
            <View style={[styles.part_one]}>
              <View style={[styles.part_one_left]}>
                <Text style={[styles.font800]}>我们约吧</Text>
                <Text style={[styles.font800]}>恋爱家人好朋友</Text>
                <Image source={img_url_one_left} style={[styles.height80,styles.width60]}></Image>
              </View>
              <View style={[styles.part_one_right]}>
                <View style={[styles.part_one_right_top,styles.bk]}>
                    <View style={[{flex:1},styles.jus_ali_center]}>
                      <Text>超低价值</Text>
                      <Text style={{marginTop:10}}>十元优惠</Text>
                    </View>
                    <View style={[{flex:1,alignSlef:"center"},styles.jus_ali_center]}>
                      <Text>2</Text>
                    </View>
                </View>
                <View style={[styles.part_one_right_bottom]}>
                  <Text>2</Text>
                </View>

              </View>
            </View>
        </View>);
    return mView;
  }
}
