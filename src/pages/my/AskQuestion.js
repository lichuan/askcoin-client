/**
 * Created by xiaoming on 2018/4/1.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import MyAvatar from '../../resource/icons/1.png';
import myBq from '../../resource/icons/my_bq.png';
import myJb from '../../resource/icons/my_jb.png';
import UserHeader from './UserHeader';
import Button from '../../components/Button';

export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <KeyboardAvoidingView
          behavior={'position'}
          keyboardVerticalOffset={10}
          style={STYLE.BACKGROUND}>

          <UserHeader
            avatarSource={MyAvatar}
            name={'杨欧巴'}
            id={'#1234569'}
            amt={200}/>
          <View style={{height:10}}/>
          {this.renderInputView()}
          <View style={{height:10}}/>
          {this.renderInputCell()}
          <View style={{height:10}}/>
          {this.renderButton()}
        </KeyboardAvoidingView>
      </View>
    )
  }

  renderInputView() {
    return(
      <View style={styles.inputView}>
        <TextInput
          placeholder={'请在这里描述你的问题(250字以内)'}
          placeholderTextColor={COLOR.grayTextColor}
          underlineColorAndroid={'transparent'}
          maxLength={250}
          multiline={true}
          style={styles.input}/>
        <View style={styles.menuItem}>
          <Text style={styles.emotionText}>
            {'#添加标签'}
          </Text>
          <TouchableOpacity>
            <Image
              source={myBq}
              style={styles.emotion}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderInputCell(){
    return(
      <View style={styles.inputCell}>
        <Image
          style={styles.amtImage}
          source={myJb}/>
        <TextInput
          placeholder={'请输入您的打赏金额'}
          placeholderTextColor={COLOR.grayTextColor}
          underlineColorAndroid={'transparent'}
          style={styles.amtInput}/>
      </View>
    )
  }

  renderButton(){
    return(
      <Button
        btnStyle={styles.btn}
        titleStyle={styles.btnText}
        title={'发布'}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  inputView:{
    backgroundColor:COLOR.whiteColor,
    padding:15,
    width:ScreenWidth,
    height:237
  },
  input:{
    flex:1,
    padding:0,
    textAlignVertical: 'top',
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor
  },
  menuItem:{
    flexDirection:'row',
    alignSelf:'flex-end',
    alignItems:'center',
    marginTop:8
  },
  emotion:{
    width:20,
    height:20,
    resizeMode:'contain'
  },
  emotionText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor,
    marginRight:10
  },
  inputCell:{
    flexDirection:'row',
    height:44,
    width:ScreenWidth,
    paddingHorizontal:15,
    backgroundColor:COLOR.whiteColor,
    alignItems:'center'
  },
  amtImage:{
    width:20,
    height:20,
    resizeMode:'contain',
    marginRight:15
  },
  amtInput:{
    padding:0,
    flex:1,
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor
  },
  btn:{
    marginHorizontal:20,
    width:ScreenWidth - 40
  },
  btnText:{
    color:COLOR.whiteColor
  }
});