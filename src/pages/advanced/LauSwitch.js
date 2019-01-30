import React, {Component} from 'react';
import {Image, Text, TextInput, View, TouchableOpacity, StyleSheet} from "react-native";
import choose from '../../resource/icons/login_choose.png'
import { I18n } from '../../language/I18n'
import {NavigationActions} from "react-navigation";

var SharedPreferences = require('react-native-shared-preferences');


class LauSwitch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lan: I18n.locale !== 'en'
    }
  }

  render() {
    const {lan} = this.state
    return (
        <View style={styles.container}>
          <TouchableOpacity style={styles.switch} onPress={() => {
            this.setState({lan: true});
            I18n.locale='zh';
            SharedPreferences.setItem('lan', 'zh')
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Tabs'})//要跳转到的页面名字
              ]
            });
            this.props.navigation && this.props.navigation.dispatch(resetAction);
          }}>
            <Text style={styles.lan}>{'中文'}</Text>
            {lan ? (<Image source={choose}/>) : (null)}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.switch,{borderBottomWidth:0}]} onPress={() => {
            I18n.locale = 'en';
            this.setState({lan: false});
            SharedPreferences.setItem('lan', 'en')
            const resetAction = NavigationActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({routeName: 'Tabs'})//要跳转到的页面名字
              ]
            });
            this.props.navigation && this.props.navigation.dispatch(resetAction);
          }}>
            <Text style={styles.lan}>{'English'}</Text>
            {lan ? (null) : (<Image source={choose}/>)}
          </TouchableOpacity>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f2f2f2'
  },
  switch: {
    height: 60,
    width: '100%',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#E7E7E7',
    borderBottomWidth: 1,
    backgroundColor:'#fff'
  },
  lan: {
    fontSize: 17,
    color: '#222222'
  }
});

export default LauSwitch