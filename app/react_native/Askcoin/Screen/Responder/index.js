/**
 * Created by zhuguoqing on 2017/6/6.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Grid,
  ThemeStyles,
} from './../../Theme'
class Responder extends Component {
  render() {
    return (
      <View style={ThemeStyles.defaultContainer}>
        <Text>抢答</Text>
      </View>
    );
  }
}
module.exports = Responder;