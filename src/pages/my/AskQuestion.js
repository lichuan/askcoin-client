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
  KeyboardAvoidingView,
  ScrollView,
  BackHandler
} from 'react-native';
import MyAvatar from '../../resource/icons/1.png';
import myBq from '../../resource/icons/my_bq.png';
import myJb from '../../resource/icons/my_jb.png';
import UserHeader from './UserHeader';
import Button from '../../components/Button';
import { EmojiOverlay } from '../../components/EmojiOverlay';

export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      value:'',
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    if (this.state.showPicker) {
      this.setState({
        showPicker:false
      })
      return true;
    } else {
      return false;
    }
  };

  emojiSelected(emoji) {
    this.setState({
      showPicker: false,
      value:this.state.value + emoji
    })
  }

  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <ScrollView
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
          <EmojiOverlay
            onCancel={()=>{
              this.setState({
                showPicker:false
              })
            }}
            hideClearButton={false}
            clearButtonText={'取消'}
            style={styles.picker}
            visible={this.state.showPicker}
            onTapOutside={() => this.setState({showPicker: false})}
            horizontal={true}
            onEmojiSelected={(emoji)=>{
              this.emojiSelected(emoji)
            }}/>
        </ScrollView>
      </View>
    )
  }

  renderInputView() {
    return(
      <View style={styles.inputView}>
        <TextInput
          onChangeText={(val)=>{
            this.setState({
              value:val
            })
          }}
          defaultValue={this.state.value}
          placeholder={'请在这里描述你的问题(250字以内)'}
          placeholderTextColor={COLOR.grayTextColor}
          underlineColorAndroid={'transparent'}
          maxLength={250}
          multiline={true}
          style={styles.input}/>
        <TouchableOpacity
          style={styles.menu}
          onPress={()=>{
            this.setState({
              showPicker:true
            })
          }}>

          <View style={styles.menuItem}>
            <Text style={styles.emotionText}>
              {'#添加表情'}
            </Text>
            <Image
              source={myBq}
              style={styles.emotion}/>
          </View>
        </TouchableOpacity>
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
  menu:{
    marginTop:8,
    alignSelf:'flex-end',
  },
  menuItem:{
    flexDirection:'row',
    alignItems:'center',
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
    width:325,
    alignSelf:'center'
  },
  picker:{
    height: 400,
    backgroundColor: '#f4f4f4'
  }
});