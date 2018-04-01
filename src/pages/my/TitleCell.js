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
import MyLine from '../../resource/icons/my_line11.png';
import PropTypes from 'prop-types';

const TitleCell = ({title})=>{
  return(
    <View style={styles.cell}>
      <Image
        style={styles.myLine}
        source={MyLine}/>
      <Text style={styles.name}>
        {title}
      </Text>
    </View>
  )
};

TitleCell.propTypes = {
  title:PropTypes.string.isRequired
};

export default TitleCell;

const styles = StyleSheet.create({
  cell:{
    flexDirection:'row',
    height:44,
    alignItems:'center',
    backgroundColor:COLOR.whiteColor,
    paddingHorizontal:15,
    borderBottomWidth:1,
    borderBottomColor:COLOR.diverColor
  },
  myLine:{
    height:13,
    width:2,
    resizeMode:'contain',
    marginRight:8
  },
  name:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor
  },
});

