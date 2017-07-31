import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity} from "react-native";

import ProgressBarDialog from "./progressBarDialog.js";

export default class Upload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      progressModalVisible: true
    };
  }

  refProgressBar = (view) => {
    this.progressBar = view;
  }

  showProgreeBar = () => {
    this.setState({progressModalVisible: true});
  }

  dismissProgressBar = () => {
    this.setState({progress: 0, progressModalVisible: false});
  }
  setProgressValue = (progress) => {
    this.setState({progress});
  }
  onProgressRequestClose = () => {
    this.dismissProgressBar();
  }
  canclePress = () => {
    this.dismissProgressBar();
  }
  render() {
    let mView = (
      <View>
        <ProgressBarDialog ref={this.refProgressBar} progress={this.state.progress} progressModalVisible={this.state.progressModalVisible} onRequestClose={this.onProgressRequestClose} canclePress={this.canclePress} needCancle={true}></ProgressBarDialog>
        <View>
          <TouchableOpacity style={{width:100,marginTop:50}} onPress={this.showProgreeBar}>
            <Text style={{fontSize:14}}>自由点击</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
    return mView;
  }

}
