/**
 * Created by zhuguoqing on 2017/6/5.
 */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
} from 'react-native';
import Screens from './Askcoin/Screen'

var warning = require('fbjs/lib/warning');

class Askcoin extends Component {
  initialRoute(route, routeStack){
    return {
      screen:Screens.Launch.routeKey
      // screen:Screens.Main.routeKey
    }
  };
  renderScene(route, navigator){
    let routeKey = route.screen;
    if (routeKey && Screens[routeKey] && Screens[routeKey].rootComponent){
      let Screen = Screens[routeKey].rootComponent;
      return <Screen navigator={navigator} screens={Screens}/>
    }else{
      warning(false,'Not found the screen :'+routeKey);
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={this.initialRoute()}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }
}
const styles = StyleSheet.create({

});

AppRegistry.registerComponent('Askcoin', () => Askcoin);
