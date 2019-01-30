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
import { I18n } from '../../language/I18n'
import myBq from '../../resource/icons/my_bq.png';
import Button from '../../components/Button';
import {EmojiOverlay} from '../../components/EmojiOverlay';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import {reply, appState, initRouter, toast} from '../../net/net';
import {defaultAvatars} from '../../resource/avatars';
import {strlen} from '../../utils/common';
import TopicStore from '../../stores/topic';

var Buffer = require('buffer/').Buffer


import QuestionItem from '../../components/questionItem'

export default class Reply extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: I18n.t(appState.replyMode === 0?'answerQuestion': appState.replyMode === 2 ? 'replyToAll': 'reply')
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      showPicker: false,
      value: '',
      count:0,
      viewHeight:0,
      contentHeight:0
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    initRouter(this);
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

  _viewLayout(event) {
    //this.titleHeight=event.nativeEvent.layout.height
    // this.getItemHeight(this.titleHeight,this.textHeight)
    this.setState({viewHeight: event.nativeEvent.layout.height})
  }

  _contentLayout(event) {
    //this.titleHeight=event.nativeEvent.layout.height
    // this.getItemHeight(this.titleHeight,this.textHeight)
    this.setState({contentHeight: event.nativeEvent.layout.height})
  }


  render() {
    const {selectTopic, selectReply} = TopicStore;
    const {replyMode} = appState;
    return (
        <View style={STYLE.BACKGROUND}>
          <ScrollView
              keyboardShouldPersistTaps={true}
              style={STYLE.BACKGROUND}>
            <KeyboardAvoidingView
                contentContainerStyle={{flex:1}}
                style={{flex:1.5}}>
              {appState.replyMode !== 2? (
                  <QuestionItem onLayout={this._contentLayout.bind(this)}>
                    <QuestionItem.InfoView>
                      <QuestionItem.Avatar
                          resizeMode={'contain'}
                          source={defaultAvatars[(replyMode === 0?selectTopic.avatar:selectReply.avatar)-1].avatar}/>
                      <View style={{justifyContent: 'space-between', marginLeft: 6}}>
                        <QuestionItem.Nickname>{Buffer.from(replyMode===0? selectTopic.name:selectReply.name,'base64').toString()}</QuestionItem.Nickname>
                        <QuestionItem.ID>{`#${selectTopic.id}`}</QuestionItem.ID>
                      </View>
                      <QuestionItem.Amount>
                        <QuestionItem.MoneyIcon
                            resizeMode={'contain'}
                            source={zzJbIcon}/>
                        <QuestionItem.Money>{replyMode === 0? selectTopic.topic_reward: selectReply.balance}</QuestionItem.Money>
                      </QuestionItem.Amount>
                    </QuestionItem.InfoView>
                    <QuestionItem.Content selectable={true}>{Buffer.from(replyMode === 0? selectTopic.topic_data: selectReply.reply_data,'base64').toString()}</QuestionItem.Content>
                  </QuestionItem>
              ):(null)}

            {this.renderInputView()}
            <View style={{height: 50}}/>
            {this.renderButton()}
            </KeyboardAvoidingView>
            {this.state.showPicker?(
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
            ):(null)}
          </ScrollView>
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
              placeholder={I18n.t('inoutReply')}
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
                  source={myBq}
                  style={styles.emotion}/>
            </View>
          </TouchableOpacity>
        </View>
    )
  }


  renderButton() {
    return (
        <Button
            onPress={()=>{
              if(this.state.value === ''){
                toast(I18n.t('inputError15'))
                return
              }
              reply(this.state.value)
            }}
            btnStyle={styles.btn}
            titleStyle={styles.btnText}
            title={I18n.t('send')}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  inputView: {
    backgroundColor: COLOR.whiteColor,
    padding: 15,
    width: ScreenWidth,
    height: 237,
    marginTop: 15
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
    marginTop:10,
    height: 400,
    backgroundColor: '#f4f4f4'
  },
  byteCount: {
    position:'absolute',
    width: ScreenWidth,
    textAlign:'center',
  },
  inputStyle:{
  }
});