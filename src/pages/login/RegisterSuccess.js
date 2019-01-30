/**
 * Created by xiaoming on 2018/3/24.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Clipboard, ToastAndroid
} from 'react-native';
import {importPriKey, appState} from '../../net/net'
var Buffer = require('buffer/').Buffer
var EC = require('elliptic').ec;
const ec = new EC('secp256k1')

import loginTitleBg from '../../resource/icons/login_title.png';
import loginFcBg from '../../resource/icons/login_fc.png';
import Button from '../../components/Button';
import { I18n } from '../../language/I18n'
import Toast from "react-native-easy-toast";
import {toast} from '../../net/net'
import AppStore from "../../stores/app";


var SharedPreferences = require('react-native-shared-preferences');


export default class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prikey:''
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    SharedPreferences.getItem('privkeyhex',(res)=>{
      this.setState({prikey:Buffer.from(res,'hex').toString('base64')})
    })
  }

  onRestore() {
    const privkeyhex  = appState.privkeyhex;
    const privb64 = Buffer.from(privkeyhex, 'hex').toString('base64')
    AppStore.handleRetryMode(true)
    importPriKey(this, privb64);
  }

  render() {
    return (
        <View style={styles.container}>
          <Image
              style={styles.titleBg}
              source={loginTitleBg}/>
          <Image
              style={styles.fc}
              source={loginFcBg}/>
          <Text style={styles.title}>
            {I18n.t('congratulations')}
          </Text>
          <View style={styles.desc}>
            <Text style={styles.descTitle}>{I18n.t('belowIsYourPrivateKey')}</Text>
            <TextInput
                underlineColorAndroid={'transparent'}
                caretHidden={true}
                multiline={true}
                style={styles.key}
                value={this.state.prikey}/>
            <Text style={styles.tip}>
              {I18n.t('keepYourKey')}
            </Text>
          </View>
          <View style={styles.btnView}>
            <Button
                onPress={() => {
                  Clipboard.setString(this.state.prikey);
                  toast(I18n.t('copyOK'));
                }}
                btnStyle={styles.btn}
                title={I18n.t('copyPrivateKey')}/>
            <Button
                onPress={() => this.onRestore()}
                btnStyle={styles.btn}
                title={I18n.t('saved')}/>
          </View>
          <Toast ref="toast" position={'center'}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center'
  },
  titleBg: {
    height: ScreenHeight/10*2,
    marginTop: 24,
    resizeMode:'contain'
  },
  fc: {
    height: ScreenHeight/10,
    marginTop: 20,
    resizeMode:'contain'

  },
  title: {
    marginTop: 20,
    fontSize: FONTSIZE.primary,
    color: COLOR.primaryTextColor,
    fontWeight: 'bold'
  },
  desc: {
    paddingBottom:12,
    width: 335,
    marginTop: 17,
    alignItems: 'center',
    backgroundColor: '#fff2c8',
    borderRadius: 5,
    borderWidth:1,
    borderColor:'#E7E7E7'
  },
  descTitle: {
    color: COLOR.normalTextColor,
    marginVertical: 14,
    fontSize: 15
  },
  tip: {
    width: 290,
    height: 38,
    textAlign: 'center',
    marginTop: 10,
    fontSize: FONTSIZE.small,
    color: COLOR.normalTextColor,
    lineHeight: 18
  },
  btnView: {
    flexDirection: 'row',
    width: 325,
    justifyContent: 'space-between'
  },
  btn: {
    marginTop: 20,
    width: 130,
    height:46
  },
  key: {
    color:'#333333',
    textAlign: 'center',
    width: 290,
    backgroundColor: '#FFFCE5'
  }
});