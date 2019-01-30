/**
 * Created by xiaoming on 2018/3/22.
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
  Modal,
  FlatList,
  Alert, ScrollView, Clipboard,BackAndroid, ToastAndroid
} from 'react-native';
import RegisterInputItem from '../../components/RegisterInputItem';
import loginBg from '../../resource/icons/login_bg.png';
import Button from '../../components/Button';
import avatar1 from '../../resource/avatars/1.png'
import Toast from 'react-native-easy-toast'

import avatars from '../../resource/avatars'
import {I18n} from '../../language/I18n'
import ModalContainer from "../../views/modalContainer";
import key_icon from '../../resource/icons/key.png';
import add_name from '../../resource/icons/login_account.png';

import signpng from '../../resource/icons/sign.png'

import {register, closeWS, importPriKey, appState, initRouter, toast, setRouterName} from '../../net/net'
import {observer} from 'mobx-react';
import {strlen} from '../../utils/common';
import AppStore from "../../stores/app";
const SharedPreferences = require('react-native-shared-preferences');

const Buffer = require('buffer/').Buffer
const EC = require('elliptic').ec;
const ec = new EC('secp256k1')

class Register extends Component {


  constructor(props) {
    super(props);
    this.state = {
      avatar: false,
      select: false,
      reStore: false,
      restoreKey: 'IUSAJHDJHJASDJGAHSDGHAFS',
      selectAvatar: {},
      noAvatar: false,
      activeAvatar: avatar1,
      avatarNum:0,
      key: '',
      loading: false,
      tapContent: '',
      isFirst: false,
      name: '',
      sign: '',
      error:false,
      errorContent:'',
      importKey:''
    };
  }



  componentDidMount() {
    initRouter(this)
    //testSign()
    SharedPreferences.getItem('ISFIRST',(res)=>{
      if(res === null){
        this.setState({isFirst: true});
        SharedPreferences.setItem('apilist',JSON.stringify([{name:'node1',address:'ws://node1.askcoin.me:19050'},{name:'node2',address:'ws://node2.askcoin.me:19050'}]))
      }
    })

    SharedPreferences.getItems(['probe','name', 'sign', 'avatar'],(res)=>{
      if(res[0] === '0'){
        console.log('name------->',res[1])
        this.setState({name: res[1],sign:res[2],avatarNum: parseInt(res[3])})
      }
    })
  }



  onRegister() {
    this.setState({reStore: false});
    this.props.navigation && this.props.navigation.replace('RegisterSuccess', {name: '注册成功'})
  };

  onRestore() {
    this.setState({reStore: true})
    //this.props.navigation && this.props.navigation.navigate('WalletRestore', {name: '恢复钱包'})
  };

  errorOk=()=>{
    this.setState({error:false})
  };

  errorCancel=()=>{
    this.setState({error:false})
  };



  async _setClipboardContent() {
    try {
      const key = await Clipboard.getString();
      this.setState({importKey:key});
    } catch (e) {
      this.setState({key: e.message});
    }
  }


  onImport() {
    this._setClipboardContent()
  }

  renderAvatar = ({item}) => {
    return (
        <TouchableOpacity
            style={styles.itemBg}
            onPress={() => {
              this.setState({select: false, activeAvatar: item.avatar, avatar: true, avatarNum: item.position})
            }}>
          <View style={styles.avatarBG}>
            <Image resizeMode={'contain'} style={styles.avatarItem} source={item.avatar}/>
          </View>
        </TouchableOpacity>
    )
  };

  render() {
    setRouterName('Register');
    const {avatar, select, reStore, activeAvatar, key, loading, tapContent, isFirst, name, sign,error,errorContent, avatarNum} = this.state;
    return (
        <View style={styles.container}>
          <Modal
              transparent
              visible={isFirst}>
            <ModalContainer>
              <View style={styles.riskTipView}>
                <ScrollView keyboardShouldPersistTaps={'always'}>
                  <Text style={styles.riskTipTitle}>{I18n.t('riskTitle')}</Text>
                  <Text
                      style={styles.riskTip}>{I18n.t('riskSubTitle')}</Text>
                  <Text style={styles.riskSubTip}>{I18n.t('risk1')}</Text>
                  <Text style={styles.riskSubTip}>{I18n.t('risk2')}</Text>
                  <Text style={styles.riskSubTip}>{I18n.t('risk3')}</Text>
                  <Text style={styles.riskSubTip}>{I18n.t('risk4')}</Text>
                  <Text style={styles.riskSubTip}>{I18n.t('risk5')}</Text>
                  <Text style={styles.riskTip}>{I18n.t('riskEnd')}</Text>
                </ScrollView>
                <View style={{flexDirection: 'row', borderTopColor: '#E7E7E7', borderTopWidth: 1}}>
                  <TouchableOpacity
                      style={[styles.tipBtn, {borderRightColor: '#E7E7E7', borderRightWidth: 1}]}
                      onPress={() => {
                        this.setState({isFirst: false});
                        closeWS()
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('disagree')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.tipBtn}
                      onPress={() => {
                        this.setState({isFirst: false})
                        SharedPreferences.setItem('ISFIRST','0');
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('agree')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalContainer>
          </Modal>
          <Modal
              onRequestClose={()=>{
                this.setState({select:false})
              }}
              transparent
              visible={select}>
            <View style={styles.selectView}>
              <View style={{height: ScreenHeight / 3 * 2, borderRadius: 5, overflow: 'hidden'}}>
                <FlatList
                    keyboardShouldPersistTaps={'always'}
                    style={styles.avatarList}
                    data={avatars}
                    numColumns={3}
                    renderItem={this.renderAvatar}/>
              </View>
            </View>
          </Modal>
          <Modal
              onRequestClose={()=>{
                this.setState({reStore: false})
              }}
              transparent
              visible={reStore}>
            <View style={styles.selectView}>
              <View style={styles.reStoreView}>
                <Text style={styles.reStoreTitle}>{I18n.t('importPrivateKey')}</Text>
                <RegisterInputItem
                    onChangeText={(text)=>{
                      this.setState({importKey:text})
                    }}
                    value={this.state.importKey}
                    itemStyle={{marginTop: 8, borderColor: '#FDF187', borderRadius: 5}}
                    source={key_icon}
                    placeholder={'Registered signature'}/>
                <View style={styles.modeBtnView}>
                  <Button
                      onPress={() => this.onImport()}
                      title={I18n.t('pastePrivateKey')}/>
                  <Button
                      onPress={() => {
                        if(this.state.importKey === ''){
                          toast(I18n.t('inputError10'));
                          return
                        }
                        if(this.state.importKey.trim().indexOf(' ') !== -1){
                          toast(I18n.t('inputError8'));
                          return
                        }
                        if(strlen(this.state.importKey.trim())!==44){
                          toast(I18n.t('inputError9'));
                          return
                        }
                        const reg=/^[a-zA-Z0-9/+]*={0,2}$/;
                        if(!reg.test(this.state.importKey.trim())){
                          toast(I18n.t('inputError9'));
                          return
                        }
                        appState.autoImport = false;
                        AppStore.handleRetryMode(true);
                        importPriKey(this,this.state.importKey)
                      }}
                      btnStyle={{marginLeft: 17}}
                      title={I18n.t('importNow')}/>
                </View>
              </View>
            </View>
          </Modal>
          <KeyboardAvoidingView
              behavior={'position'}
              style={styles.keyboard}>
            <Image
                source={loginBg}
                style={styles.loginBg}/>
            <TouchableOpacity
                style={styles.avatarView}
                onPress={() => {
                  this.setState({select: true})
                }}>
              <Image
                  resizeMode={'contain'}
                  source={activeAvatar}
                  style={styles.avatar}/>
              {avatar ? (null) : (
                  <Text style={styles.tip}>{I18n.t('selectAvatarL')}</Text>
              )}
            </TouchableOpacity>
            <RegisterInputItem
                onChangeText={(text) => {
                  this.setState({name: text})
                }}
                value={name}
                itemStyle={{marginTop: 15, borderColor: '#FDF187', borderRadius: 5}}
                source={add_name}
                placeholder={I18n.t('inputAccountName')}/>
            <RegisterInputItem
                onChangeText={(text) => {
                  this.setState({sign: text})
                }}
                value={sign}
                itemStyle={{marginTop: 10, borderColor: '#FDF187', borderRadius: 5}}
                source={signpng}
                placeholder={I18n.t('signature')}/>
            <View style={styles.bottomBtn}>
              <Button
                  onPress={() => {
                    if (activeAvatar === avatar1) {
                      toast(I18n.t('selectFirst'));
                      return
                    }

                    if (name === '') {
                      toast(I18n.t('inputError1'));
                      return
                    }

                    if (strlen(name) > 15) {
                      toast(I18n.t('inputError2'));
                      return
                    }

                    if (name.indexOf(' ') !== -1) {
                      toast(I18n.t('inputError4'));
                      return
                    }

                    if (sign === '') {
                      toast(I18n.t('inputError3'));
                      return
                    }

                    if(sign.trim().indexOf(' ') !== -1){
                      toast(I18n.t('inputError7'));
                      return
                    }


                    let signobj;
                    try {
                      signobj = JSON.parse(sign)
                    } catch (error) {

                    }
                    console.log('signobj----', signobj)
                    if (!signobj || !signobj.sign || !signobj.sign_data || !signobj.sign_data.block_id || !signobj.sign_data.name || !signobj.sign_data.fee || !signobj.sign_data.referrer) {
                      toast(I18n.t('inputError5'));
                      return
                    }

                    if (Buffer.from(name).toString('base64') !== signobj.sign_data.name) {
                      toast(I18n.t('inputError6'));
                      return
                    }

                    register(this ,sign, avatarNum);
                  }}
                  title={I18n.t('registerNow')}/>
              <Button
                  onPress={() => {
                    this.setState({reStore: true});
                  }}
                  btnStyle={{marginLeft: 17}}
                  title={I18n.t('importPrivateKey')}/>
            </View>
          </KeyboardAvoidingView>
          <Toast ref="toast" position={'top'}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  loginBg: {
    width: ScreenWidth,
  },
  bottomBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  keyboard: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  },
  avatarView: {
    height: 88,
    width: 88,
    borderRadius: 44,
    marginTop: 15,
    alignSelf: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.primaryColor,
    borderWidth: 1,
    borderColor: COLOR.secondaryColor
  },
  avatar: {
    height: 58,
    width: 58,
  },
  tip: {
    fontSize: 13,
    paddingTop: 6,
    width: 92,
    height: 32,
    position: 'absolute',
    top: 30,
    color: '#fff',
    backgroundColor: '#00000081',
    textAlign: 'center'
  },
  selectView: {
    backgroundColor: 'rgba(52,52,52,0.5)',
    width: ScreenWidth,
    height: ScreenHeight,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarList: {
    overflow: 'hidden'
  },
  avatarItem: {
    width: 58,
    height: 58,
  },
  itemBg: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E7E7E7'
  },
  reStoreView: {
    width: ScreenWidth / 10 * 9,
    height: 'auto',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: 26,
    borderRadius: 5
  },
  reStoreTitle: {
    fontSize: 18,
    marginVertical: 20
  },
  reStoreBtn: {},
  reStoreKey: {
    borderRadius: 5,
    backgroundColor: '#FFF2C8',
    width: ScreenWidth / 10 * 8,
    paddingHorizontal: 20,
    height: 48
  },
  modeBtnView: {
    flexDirection: 'row',
    width: ScreenWidth / 10 * 8,
    justifyContent: 'space-between',
    marginTop: 26
  },
  avatarBG: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#FFF9C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipView: {
    width: ScreenWidth / 10 * 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden'
  },
  tipTitle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    color: '#333333'
  },
  tipBtn: {
    height: 52,
    backgroundColor: '#fff',
    width: ScreenWidth / 10 * 9 / 2,
    color: COLOR.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitle: {
    fontSize: 15,
    color: COLOR.normalColor
  },
  subTip: {
    fontSize: 15,
    marginTop: 14,
    lineHeight: 20,
    paddingHorizontal: 36
  },
  tipSubTitle: {
    fontSize: 15,
    paddingHorizontal: 16,
    lineHeight: 23,
    marginTop: 8
  },
  riskTipTitle: {
    fontSize: 17,
    alignSelf: 'center',
    marginTop: 15,
    color: '#333333',
    fontWeight: 'bold'
  },
  riskTipView: {
    height: ScreenHeight / 3 * 2,
    width: ScreenWidth / 10 * 9,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden'
  },
  riskTip: {
    fontSize: 15,
    paddingHorizontal: 16,
    lineHeight: 23,
    marginTop: 8,
  },
  riskSubTip: {
    fontSize: 15,
    marginTop: 14,
    lineHeight: 24,
    paddingHorizontal: 36
  },
  errorTip: {
    fontSize:15,
    lineHeight:23,
    paddingHorizontal:24,
    marginTop:6,
    marginBottom:24
  },
  box: {
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    width: 275,
    height: 47,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 11
  },
  input: {
    padding: 0,
    flex: 1,
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor,
    marginLeft: 15,
  },
  icon: {
    width: 16,
    height: 17,
  },
});


export default observer(Register)