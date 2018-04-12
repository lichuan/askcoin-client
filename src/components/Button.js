/**
 * Created by xiaoming on 2017/6/7.
 */
import React,{Component} from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View
} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component{
  render(){
    return(
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[styles.btn,this.props.btnStyle]}>
        <Text style={[styles.title,this.props.titleStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

Button.propTypes = {
  titleStyle: Text.propTypes.style,
  title: PropTypes.string.isRequired
};


const styles = StyleSheet.create({
  btn:{
    height:40,
    justifyContent:'center',
    alignItems:'center',
    minWidth:130,
    backgroundColor:COLOR.primaryColor,
    borderRadius:5
  },
  title:{
    color:COLOR.normalColor,
    fontSize:FONTSIZE.normal,
  }
});
