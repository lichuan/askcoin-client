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
  BackHandler, Platform
} from 'react-native';
import UserStore from '../../stores/user'
import { I18n } from '../../language/I18n'
import myBq from '../../resource/icons/my_bq.png';
import myJb from '../../resource/icons/zz_jb.png';

import UserHeader from './UserHeader';
import Button from '../../components/Button';
import {EmojiOverlay} from '../../components/EmojiOverlay';
import {createTopic, initRouter} from '../../net/net';
import {defaultAvatars} from '../../resource/avatars'
import {strlen} from "../../utils/common";
var Buffer = require('buffer/').Buffer;


export default class AskQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      value: '',
      reward: 0,
      count:0
    };
  }

  componentWillMount() {
      initRouter(this);
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
        showPicker: false
      })
      return true;
    } else {
      return false;
    }
  };

  emojiSelected(emoji) {
    this.setState({
      showPicker: false,
      value: this.state.value + emoji
    })
  }

  render() {
    return (
        <View style={STYLE.BACKGROUND}>
            <KeyboardAvoidingView
                style={styles.keyboard}>
              <UserHeader
                  avatarSource={defaultAvatars[UserStore.avatar-1].avatar}
                  name={Buffer.from(UserStore.name,'base64').toString()}
                  id={UserStore.id}
                  amt={UserStore.balance}/>
              <View style={{height: 10}}/>
              {this.renderInputView()}
              <View style={{height: 10}}/>
              {this.renderInputCell()}
              <View style={{height: 10}}/>
              {this.renderButton()}
            </KeyboardAvoidingView>
              <EmojiOverlay
                  onCancel={() => {
                    this.setState({
                      showPicker: false
                    })
                  }}
                  hideClearButton={false}
                  clearButtonText={I18n.t('cancel')}
                  style={styles.picker}
                  visible={this.state.showPicker}
                  onTapOutside={() => this.setState({showPicker: false})}
                  horizontal={true}
                  onEmojiSelected={(emoji) => {
                    this.emojiSelected(emoji)
                  }}/>
        </View>
    )
  }

  renderInputView() {
    return (
        <View style={styles.inputView}>
          <TextInput
              onChangeText={(val) => {
                this.setState({
                  value: val,
                  count: strlen(val)
                })
              }}
              defaultValue={this.state.value}
              placeholder={I18n.t('inputQues')}
              placeholderTextColor={COLOR.grayTextColor}
              underlineColorAndroid={'transparent'}
              multiline={true}
              style={styles.input}/>
          <TouchableOpacity
              style={styles.menu}
              onPress={() => {
                this.setState({
                  showPicker: true
                })
              }}>

            <View style={styles.menuItem}>
              <Text style={styles.emotionText}>
                {I18n.t('emoticon')}
              </Text>
              <Image
                  resizeMode={'contain'}
                  source={myBq}
                  style={styles.emotion}/>
            </View>
          </TouchableOpacity>
        </View>
    )
  }

  renderInputCell() {
    return (
        <View style={styles.inputCell}>
          <Image
              style={styles.amtImage}
              source={myJb}/>
          <TextInput
              onChangeText={(text)=>{
                this.setState({reward:text})
              }}
              keyboardType={'numeric'}
              placeholder={I18n.t('inputReward')}
              placeholderTextColor={COLOR.grayTextColor}
              underlineColorAndroid={'transparent'}
              style={styles.amtInput}/>
        </View>
    )
  }

  renderButton() {
    const {value, reward} = this.state;
    return (
        <Button
            onPress={()=>{
              createTopic(value, reward)
            }}
            btnStyle={styles.btn}
            titleStyle={styles.btnText}
            title={I18n.t('send')}/>
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    backgroundColor: COLOR.bgColor,

  },
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  inputView: {
    backgroundColor: COLOR.whiteColor,
    padding: 15,
    width: ScreenWidth,
    height: 237
  },
  input: {
    flex: 1,
    padding: 0,
    textAlignVertical: 'top',
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor
  },
  menu: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotion: {
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  emotionText: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor,
    marginRight: 10
  },
  inputCell: {
    flexDirection: 'row',
    height: 44,
    width: ScreenWidth,
    paddingHorizontal: 15,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center'
  },
  amtImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15
  },
  amtInput: {
    padding: 0,
    flex: 1,
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor
  },
  btn: {
    width: 325,
    alignSelf: 'center'
  },
  picker: {
    height: 400,
    backgroundColor: '#f4f4f4'
  },
  keyboard: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  byteCount: {
    position:'absolute',
    width: ScreenWidth,
    textAlign:'center',
  }
});