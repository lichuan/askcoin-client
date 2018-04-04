/* @flow */

import React, {
  Component
} from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Platform
} from 'react-native';
import Button from './Button';
import PropTypes from 'prop-types';


/** EXAMPLE

let info = {
    title : 是否保存图片,
    titleStyle : {},
    message : '',
    messageStyle : {},
    input: { //设置输入框，默认null
       defaultValue: ''   
       onChangeText: text => {},
       placeholder: '请输入',
       maxLength: 10,
    },
    buttons : [
      {
        title:'取消',
        onPress:()=>{this.setState({visible:false})}
      },
      {
        title:'title2',
        onPress:()=>{}
      },
      {
        title:'title3',
        titleStyle: {color:'blue'},
        onPress:()=>{}
      },
    ] ,
}

*/

const BoxWidth = 0.8*ScreenWidth;
const styles = StyleSheet.create({
  center:{
    alignItems:'center',
    justifyContent:'center',
  },
  row: {
    flexDirection: 'row',
  },
  fill:{
    flex:1,
  },
  absolute:{
    position: 'absolute',
  },
  fillAbsolute:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  centerbox: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: BoxWidth,
    // paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingTop: 10,
    color: '#333333',
    textAlign: 'center',
    backgroundColor:'rgba(0,0,0,0)',
  },
  message: {
    fontSize: 13,
    paddingHorizontal: 10,
    paddingBottom: 15,
    paddingTop: 10,
    backgroundColor:'rgba(0,0,0,0)',
    color: '#898989',
    textAlign:'center'
  },
  emptyMessage: {
    paddingBottom: 15,
  },
  horizontalLine: {
    width: BoxWidth,
    height: 1,
    backgroundColor: COLOR.bgColor,
  },
  verticalLine: {
    width: 1,
    backgroundColor: COLOR.bgColor,
  },
  defaultBtnTitle: {
    fontSize: FONTSIZE.normal,
  },
  inputSuperView: {
      width: BoxWidth-30,
      height: 44,
      borderWidth: 0.5,
      marginHorizontal:10,
      marginBottom: 30,
      borderRadius: 22,
      borderColor: 'lightgray',
  },
  input:{
      fontSize: 14,
      paddingVertical:0,
      paddingRight:15,
      paddingLeft:25,
      flex: 1,
  },
  desc:{
    fontSize:FONTSIZE.large,
    color:COLOR.grayTextColor,
    textAlign: 'center',
    paddingTop: 25,
  },
  btn:{
    flex:1,
    marginHorizontal:0,
    borderRadius:10,
    backgroundColor:COLOR.whiteColor,
  }
});


export default class AlertControl extends React.Component{

  static defaultProps = {
    visible: false,
    title: 'title',
    buttons: [{title:'title1',onPress:()=>{}}],
    titleStyle: {},
  };
  static propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    desc: PropTypes.string,
    buttons: PropTypes.array,
    titleStyle: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
        inputValue: '',
        title: 'Title',
        desc:'提示',
        message: '',
        buttons: [],
        callBack: (btnIndex)=>{},
        visible: false,
        titleStyle: {},
        messageStyle: {},
        scale: new Animated.Value(Platform.OS=='android'?1:0.9),
    };
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount(){}

  show(info) {

    // 设置input初始值
    let inputValue = '';
    if (info.input && info.input.defaultValue) {
      inputValue = info.input.defaultValue;
    }

    this.setState({
      ...info,
      inputValue: inputValue,
      visible: true,
    })

    if (Platform.OS=='android') {
    } else {
      Animated.timing(this.state.scale,{
        toValue: 1,
        duration: 250,
        delay: 0,
      }).start();
    }
  }

  dismiss() {
    this.setState({
      visible: false,
      title: '',
      message: '',
      desc:'',
      buttons: [],
      callBack: (btnIndex)=>{},
      titleStyle: {},
      messageStyle: {},
      scale: new Animated.Value(Platform.OS=='android'?1:0.9),
    })
  }

  _onPressFromItem(item) {
      this.dismiss();
      setTimeout(function () {
          item.onPress&&item.onPress();
      }, 500);
  }

  _renderButtons(buttons) {
    if (buttons.length!=2) {
        return (
            buttons.map((item,index)=>{
                return <View key={index} style={{height:44}}>
                  {index!=0&&(<View style={styles.horizontalLine}></View>)}
                  <Button btnStyle={styles.btn}
                    title={item.title}
                    titleStyle={[styles.defaultBtnTitle,item.titleStyle||{}]}
                    onPress={()=>{
                      if (item.willOnPress) {
                        item.willOnPress() && this._onPressFromItem(item);
                      } else {
                        this._onPressFromItem(item);
                      }
                    }}
                  />
                </View>
            })
        )
    } else {
        let item1 = buttons[0];
        let item2 = buttons[1];
        return (
        <View style={styles.row}>
          <Button btnStyle={styles.btn}
            title={item1.title}
            titleStyle={[styles.defaultBtnTitle,item1.titleStyle||{}]}
            onPress={()=>{
              if (item1.willOnPress) {
                item1.willOnPress() && this._onPressFromItem(item1);
              } else {
                this._onPressFromItem(item1);
              }
            }}
          />
          <View style={styles.verticalLine}></View>
          <Button btnStyle={styles.btn}
            title={item2.title}
            titleStyle={[styles.defaultBtnTitle,item2.titleStyle||{}]}
            onPress={()=>{
              if (item2.willOnPress) {
                item2.willOnPress() && this._onPressFromItem(item2);
              } else {
                this._onPressFromItem(item2);
              }
            }}
          />
        </View>
      )
    }
  }

  _renderMessage(message,messageStyle) {
    if (message.length>0) {
        return <Text style={[styles.message,messageStyle]}>{message}</Text>
    } else {
        return <View style={styles.emptyMessage}></View>
    }
  }

  _renderInput(config) {
    if (config) {
        return <View style={styles.inputSuperView}>
          <TextInput returnKeyType="done" returnKeyLabel="done" {...config} style={[styles.input,config.style||{}]}
            value={this.state.inputValue}
            onChangeText={text => {
              this.setState({ inputValue: text });
              typeof config.onChangeText === 'function' && config.onChangeText(text);
            }}
            underlineColorAndroid={'transparent'}/>
        </View>
    } else {
        return <View/>
    }

  }

  render() {
    let {visible,buttons,title,message,titleStyle,messageStyle,input,desc} = this.state;
    return(
      <Modal visible={visible} transparent={true} animationType="none"
        onRequestClose={()=>{this.dismiss()}}>
        {/* <View style={[styles.content,styles.fill,styles.center]}> */}
        <KeyboardAvoidingView behavior="padding" style={[styles.content,styles.fill,styles.center]}>
          <Animated.View style={[styles.centerbox,{transform:[{scale: this.state.scale}]}]}>
            <Text style={[styles.desc,titleStyle]}>{desc}</Text>
            <Text style={[styles.title,titleStyle]}>{title}</Text>
            {this._renderMessage(message,messageStyle)}
            {this._renderInput(input)}
            <View style={styles.horizontalLine}></View>
            {this._renderButtons(buttons)}
          </Animated.View>
        </KeyboardAvoidingView>
        {/* </View> */}
      </Modal>
    )
  }
}
