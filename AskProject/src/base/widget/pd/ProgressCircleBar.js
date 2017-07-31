import React, {Component} from "react";

import {View, Text, Modal, StyleSheet, Dimensions} from "react-native";
import Spinner from 'react-native-spinkit';

const {width, height} = Dimensions.get("window");
//圆形进度条
export default class ProgressCircleBar extends Component {
  static defaultProps = {
    animationType: "none",
    transparent: true,
    progressModalVisible: true,
    onShow: () => {},
    onRequestClose: () => {},
    color: "black"
  };
  constructor(props) {
    super(props);
    this.initProps();
  }
  initProps() {
    this.animationType = this.props.animationType;
    this.transparent = this.props.transparent;
    this.progressModalVisible = this.props.progressModalVisible;
    this.onRequestClose = this.props.onRequestClose;
    this.color = this.props.color;
  }
  render() {
    let mView = (
      <Modal animationType={this.animationType} transparent={this.transparent} visible={this.progressModalVisible} onRequestClose={this.onRequestClose}>
        <View style={[styles.root, styles.bk]}>
          <Spinner isVisible={true} size={width / 11} type="FadingCircle" color={this.color}></Spinner>
        </View>
      </Modal>

    );
    return mView;
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  bk: {
    borderWidth: 0,
    borderColor: "red"
  }
});
