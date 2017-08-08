import React, {Component} from "react";

import {View, Text, StyleSheet, FlatList} from "react-native";

export default class ArgumentsTest extends Component {

  constructor(props) {
    super(props);
    this.state={
      age:"27"
    }
  }
  static defaultProps = {
    name: "lc",
    age: "27"
  };
  getTitle() {
    return true;
  }
  render() {
    var tv = (
      <Text onPress={() =>{
        console.log("单击之前:", this.state.age);
        this.setState({age:"17"});
        console.log("单击之后:", this.state.age);
      }}>
        dasdas
      </Text>
    );
    var mView = (
      <View>
        <View style={{marginTop:100}}>
          {this.getTitle() && tv}
        </View>
      </View>
    );
    return mView;
  }
}
