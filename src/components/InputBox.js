/**
 * Created by xiaoming on 2017/6/16.
 * 登录界面输入框
 */
import React,{Component} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import loginBt from '../resource/icons/login_bt.png';

export default class InputBox extends Component{
  static propTypes = {
    placeholder:TextInput.propTypes.placeholder,
    maxLength:TextInput.propTypes.maxLength,
    value:TextInput.propTypes.value,
    keyboardType:TextInput.propTypes.keyboardType,
    secureTextEntry:TextInput.propTypes.secureTextEntry,
    onChangeText:TextInput.propTypes.onChangeText,
    textStyle:TextInput.propTypes.style,
    // itemStyle:View.propTypes.style,
    // btnStyle:View.propTypes.style,
    disabled:TouchableOpacity.propTypes.disabled,
    editable:TextInput.propTypes.editable,
    showRightImage:PropTypes.bool,
    source:Image.propTypes.source,
    onRightBtnPress:PropTypes.func,
    onLayout:PropTypes.func
  };

  render(){
    return(
      <View
        onLayout={this.props.onLayout}
        style={[styles.box,this.props.itemStyle]}>
        <Image
          source={this.props.source}
          style={[styles.icon,this.props.iconStyle]}/>
        <TextInput
          style={[styles.input,this.props.textStyle]}
          underlineColorAndroid={'transparent'}
          placeholder={this.props.placeholder}
          placeholderTextColor={COLOR.grayTextColor}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          editable={this.props.editable}
          maxLength={this.props.maxLength}/>
          {this.renderRightImage()}
      </View>
    )
}

  renderRightImage(){
      if(this.props.showRightImage){
          return(
              <TouchableOpacity
                onPress={this.props.onRightBtnPress}
                  style={{marginLeft: 15}}>
                  <Image
                    source={loginBt}
                    style={styles.loginBt}/>
              </TouchableOpacity>
          )
      }
    }
}

const styles = StyleSheet.create({
  box:{
    borderRadius:5,
    borderWidth:1,
    borderColor:COLOR.borderColor,
    backgroundColor:'#fffbdf',
    marginHorizontal:24,
    width: 325,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:15
  },
  icon:{
    width: 16,
    height: 17,
  },
  input:{
    padding: 0,
    flex: 1,
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor,
    marginLeft: 15
  },
  loginBt:{
    width:17,
    height:10,
    resizeMode:'contain'
  }
});
