/**
 * Created by xiaoming on 2018/4/1.
 */
import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import laBa from '../resource/icons/chonghzi_laba.png';

const HintCell = ({hintTitle})=>{
  return(
    <View style={styles.hint}>
      <Image
        style={styles.laBa}
        source={laBa}/>
      <Text style={styles.hintTitle}>
        {hintTitle}
      </Text>
    </View>
  )
};

HintCell.propTypes = {
  hintTitle:PropTypes.string.isRequired
};

export default HintCell;

const styles = StyleSheet.create({
  hint: {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    height:40,
    backgroundColor:'#fff2c8'
  },
  laBa: {
    width:21,
    height:21,
    marginRight:15,
    resizeMode:'contain'
  },
  hintTitle:{
    fontSize:COLOR.primary,
    color:COLOR.normalTextColor
  },
});