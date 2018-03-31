/**
 * Created by xiaoming on 2018/3/30.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from 'react-native';

export default class MyAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>我的回答</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  tabBarTextStyle: {
    fontSize: 16,
  },
  tabBarUnderlineStyle: {
    backgroundColor: COLOR.normalColor,
    height: 2,
  },
  scrollableTabView: {
    backgroundColor: '#fff',
  }
});