import React, {Component} from "react";

import ReactNative, {View, Text, StyleSheet, ScrollView, TextInput} from "react-native";

export default class LoadingServerActivity extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var mView = (
      <ScrollView ref="scroll" keyboardShouldPersistTaps="always">
        <View onStartShouldSetResponderCapture={this.onstart}>
          <TextInput style={[styles.input]} onChangeText={this.changeHour} onFocus={this.scrollViewTo} onEndEditing={this.onEnd} ref="hour" maxLength={2} placeholder="0" placeholderTextColor="#b2b2b2" multiline={false} keyboardType="numeric"></TextInput>
        </View>
      </ScrollView>

    );
    return mView;
  }
  onstart = (e) => {
    let target = e.nativeEvent.target;
    if (target !== ReactNative.findNodeHandle(this.refs.hour)) {
      console.log("this.refs.hour", this.refs.hour);
      this.refs.hour.blur();
    }
  }
  onChangeHour = (txt) => {}
  scrollViewTo = (e) => {
    let target = e.nativeEvent.target;
    let scrollLength = 0; //
    if (target == ReactNative.findNodeHandle(this.refs.hour)) {
      scrollLength = 2;
    }
    console.log("this.refs.scroll2", this.refs.scroll);
    this.refs.scroll.scrollTo({y: scrollLength, x: 0});
  }

  onEnd = () => {
    let m = {
      y: 0,
      x: 0,
      animated: true
    };
    console.log("this.refs.scroll1", this.refs.scroll);
    this.refs.scroll.scrollTo({m});
  }
}

const styles = StyleSheet.create({
  input: {
    marginTop: 300,
    width: 100,
    height: 100
  }
});
