/**
定时器demo
**/
import React,{Component} from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default class AnimateDemo extends Component{
  constructor(props){
    super(props);
    this.state={
      data:0
    };
    this._timer=null;
    this._index=0;
  }
  render(){
      var mView = (
        <View style={{flex:1}}>
          <Text>请选择时长(s)</Text>
          <TextInput onChangeText={(txt)=>{
                        this.setState({data:txt});
                        this._index = txt;
                      }}>
          </TextInput>
          <View style={{height:100,alignItems:"center"}}>
            <Text style={{fontSize:22,color:"red"}}>{this.state.data}</Text>
          </View>
          <View style={{flexDirection:"row",justifyContent:"space-around"}}>
            <TouchableOpacity style={{width:60,height:40,justifyContent:"center",alignItems:"center",backgroundColor:"#7ecfe8"}}
                                onPress={()=>this.countTime()}>
              <Text>开始</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{width:60,height:40,justifyContent:"center",alignItems:"center",backgroundColor:"#7ecfe8"}}
                              onPress={()=>this.stopTime()}>
              <Text>暂停</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      return mView;
  }
  countTime(){
    this._timer = setInterval(()=>{
      this.setState({data:this._index--});
      if(this.state.data<=0){
        this._timer&&clearInterval(this._timer);
        alert("时间到了");
      }
    },1000);
  }
  stopTime(){
    this._timer&&clearInterval(this._timer);
  }
  componentWillUnmount(){
    this._timer&&clearInterval(this._timer);
  }
}
