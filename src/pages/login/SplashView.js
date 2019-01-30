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
  Platform, Modal, ScrollView, Button
} from 'react-native';
import qdyMoney from '../../resource/icons/qdy_money.png';
import qdyPic from '../../resource/icons/qdy_pic.png';
import PropTypes from 'prop-types';
import splash_center from '../../resource/icons/splash_center.png'


const paddingTopHeight = Platform.OS === 'ios' ? 20 : 0;
export default class SplashView extends Component {
  static propTypes = {
    onPress: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isFirst: true,
    }
  }

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
          <View style={{width:260}}>
          <View style={styles.descView}>
            <Text style={styles.desc}>{'Waiting to get into the App'}</Text>
          </View>
            <Image
                style={{marginLeft:ScreenWidth/3-32,height:108,width:184}}
                resizeMode={'contain'}
                source={splash_center}/>
          </View>
          <Text style={styles.welcome}>{'Welcome to ASKCOIN~'}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    paddingTop: paddingTopHeight
  },
  money: {
    width: 87,
    height: 78,
    resizeMode: 'contain',
    marginTop: 47
  },
  pic: {
    marginTop: 25,
    width: 260,
    height: 270,
    backgroundColor:'#fff987'
  },
  desc: {
    fontSize: FONTSIZE.normal,
    color: '#ffffff',
    textAlign: 'center',
  },
  space: {
    flex: 1,
    backgroundColor: COLOR.bgColor
  },
  btn: {
    marginBottom: 47,
    width: 285,
    height: 40,
  },
  tipTitle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    color: '#333333'
  },
  tip: {
    fontSize: 15,
    paddingHorizontal: 16,
    lineHeight: 23,
    marginTop: 8
  },
  subTip: {
    fontSize: 15,
    marginTop: 14,
    lineHeight: 20,
    paddingHorizontal: 36
  },
  tipView: {
    height: ScreenHeight / 3 * 2,
    width: ScreenWidth / 10 * 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden'
  },
  tipBtn: {
    height: 52,
    backgroundColor: '#fff',
    width: ScreenWidth / 10 * 9 / 2,
    color: COLOR.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontSize: 15,
    color: COLOR.normalColor
  },
  welcome: {
    color: COLOR.normalColor,
    fontSize: 20,
    marginTop: 6
  },
  descView: {
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#F5BA1A',
    height:40,
    width: 253,
    marginTop:-3
  }
});