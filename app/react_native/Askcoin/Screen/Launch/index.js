/**
 * Created by zhuguoqing on 2017/6/5.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Navigator,
  Text,
  Image,
} from 'react-native';
import {
  Grid,
  ThemeStyles,
  ThemeImages,
} from './../../Theme'

class Launch extends Component {
  componentDidMount() {
    let mainRoute = this.props.screens.Main.routeKey;
    setTimeout(()=>{
      this.props.navigator.push({screen:mainRoute});
    },3000);
  }
  render() {
    return (
      <View style={ThemeStyles.defaultContainer}>
        <View style={styles.topView}>
          <Image style={styles.logoImage} source={ThemeImages.commonImages.logoImage}/>
          <View style={styles.textView}>
            <Text style={styles.text}>ask anyone, anything,</Text>
            <Text style={styles.text}>from anywhere.</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Image style={styles.bigImage} source={ThemeImages.commonImages.posterImage}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView:{
    marginTop:Grid.a*15,
    alignItems:'center',
  },
  logoImage:{
    width:12*Grid.a,
    height:12*Grid.a,
    resizeMode:'contain'
  },
  textView:{
    marginTop:Grid.a*2,
    alignItems:'center',
  },
  text:{
    fontSize:Grid.a*2.5,
  },
  bottomView:{
    flex:1
  },
  bigImage:{
    width:6*Grid.A,
    height:10*Grid.A,
    resizeMode:'contain'
  }
});
module.exports = Launch;