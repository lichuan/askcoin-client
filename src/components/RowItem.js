/**
 * Created by xiaoming on 2018/3/26.
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
import arrowRight from '../resource/icons/arrow_right.png';
import PropTypes from 'prop-types';
import login from '../resource/icons/login_account.png'

export default class RowItem extends Component {
  static propTypes = {
    name:PropTypes.string.isRequired,
    onPress:PropTypes.func,
    desc:PropTypes.string,
    hideLine:PropTypes.bool
  };
  render() {
    const {name, onPress,desc,hideLine, icon} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}>
        <View style={{backgroundColor:COLOR.whiteColor}}>
          <View style={styles.item}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image style={{width:25,height:25}} source={icon}/>
            <Text style={styles.name}>
              {name}
            </Text>
            </View>
            <View style={styles.rightItem}>
              <Text style={styles.desc}>
                {desc}
              </Text>
              <Image
                source={arrowRight}
                style={styles.rightIcon}/>
            </View>
          </View>
          {
            hideLine
              ? null
              : <View style={styles.line}/>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  item:{
    width:ScreenWidth,
    flexDirection:'row',
    alignItems:'center',
    height:59.5,
    paddingHorizontal:15,
    justifyContent:'space-between',
  },
  name:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
    marginLeft:13
  },
  desc:{
    fontSize:FONTSIZE.primary,
    color:'#999',
    marginHorizontal:10
  },
  rightItem:{
    flexDirection:'row',
    alignItems:'center',

  },
  rightIcon:{
    width:9,
    height:15,
    resizeMode:'contain',
  },
  line:{
    marginLeft:15,
    height:1,
    backgroundColor:'#e7e7e7'
  }
});