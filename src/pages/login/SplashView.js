/**
 * Created by xiaoming on 2018/4/2.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';
import qdyMoney from '../../resource/icons/qdy_money.png';
import qdyPic from '../../resource/icons/qdy_pic.png';
import Button from '../../components/Button';
import PropTypes from 'prop-types';

const paddingTopHeight = Platform.OS === 'ios' ? 20 : 0;
export default class SplashView extends Component {
  static propTypes = {
    onPress:PropTypes.func
  };

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          hidden={true}/>
        <Image
          style={styles.money}
          source={qdyMoney}/>
        <Image
          style={styles.pic}
          source={qdyPic}/>
        <Text style={styles.desc}>
          {'Waiting to get into the App'}
        </Text>
        <View style={styles.space}/>
        <Button
          onPress={this.props.onPress}
          btnStyle={styles.btn}
          titleStyle={styles.title}
          title={'Welcome to ASKCOIN~'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.bgColor,
    alignItems:'center',
    paddingTop: paddingTopHeight
  },
  money:{
    width:87,
    height:78,
    resizeMode:'contain',
    marginTop:47
  },
  pic:{
    marginTop:25,
    width:288,
    height:270,
    resizeMode:'contain',
  },
  desc:{
    fontSize:FONTSIZE.normal,
    color:'#5c5c5c',
    marginTop:20
  },
  space:{
    flex:1,
    backgroundColor:COLOR.bgColor
  },
  btn:{
    marginBottom:47,
    width:285,
    height:40,
    backgroundColor:'#fff7b3'
  },
  title:{
    color:'#f5ba1a'
  }
});