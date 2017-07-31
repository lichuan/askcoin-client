import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    Button,
} from 'react-native';


export default class FlatListDemo extends Component{
  _flatList;
  render(){
    var data = [];
    for(var i=0;i<100;i++){
      data.push({key:i,title:i+''});
    }
  }
}
