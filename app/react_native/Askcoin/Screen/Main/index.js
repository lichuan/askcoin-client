/**
 * Created by zhuguoqing on 2017/6/5.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  Text,
} from 'react-native';
import {
  Grid,
  ThemeStyles,
  ThemeColors,
} from './../../Theme'

import {TabBar} from './../../Component/TabBar'

class Main extends Component {

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      tabIndex:0,
    };
  }
  onTabSelected(index){
    this.setState({
      tabIndex:index
    })
  }
  render() {
    let Container;

    if (this.state.tabIndex == 0){
      Container = this.props.screens.Responder.rootComponent;
    }else if (this.state.tabIndex == 1) {
      Container = this.props.screens.Mine.rootComponent;
    }else{
      Container = this.props.screens.Transfer.rootComponent;
    }
    return (
      <View style={styles.rootView}>
        <View style={styles.containerView}>
          <Container/>
        </View>
        <View style={styles.tabBarView}>
          <TabBar onTabSelected={this.onTabSelected.bind(this)}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  rootView:{
    flex:1,
    ...ThemeColors.contentViewBkgColor,
    justifyContent:'flex-end'
  },
  containerView:{
    flex:1,
    backgroundColor:'#FF0000'
  },
  tabBarView:{
    height:60,
  }
});
module.exports = Main;