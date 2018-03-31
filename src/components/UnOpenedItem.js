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

export default class UnOpenedItem extends Component {
  static propTypes = {
    name:PropTypes.string.isRequired,
    onPress:PropTypes.func,
    hideLine:PropTypes.bool
  };
  render() {
    const {name, onPress,hideLine} = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={true}>
        <View style={{backgroundColor:COLOR.whiteColor}}>
          <View style={styles.item}>

            <View>
              <Text style={styles.name}>
                {name}
              </Text>
              <Text style={styles.desc}>
                {'该功能暂时未开放'}
              </Text>
            </View>

            <Image
              source={arrowRight}
              style={styles.rightIcon}/>
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
    height:80,
    paddingHorizontal:15,
    justifyContent:'space-between',
  },
  name:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor
  },
  desc:{
    fontSize:FONTSIZE.normal,
    color:COLOR.grayTextColor,
    marginTop:10
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