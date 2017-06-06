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
class Transfer extends Component {
  render() {
    return (
      <View style={ThemeStyles.defaultContainer}>
        <Text>转帐</Text>
      </View>
    );
  }
}
module.exports = Transfer;