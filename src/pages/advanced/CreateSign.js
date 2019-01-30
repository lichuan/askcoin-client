import React, {Component} from 'react';
import {Text, TextInput, View, Clipboard, ToastAndroid} from "react-native";
import RegisterInputItem from "../../components/RegisterInputItem";
import loginAccount from '../../resource/icons/login_account.png';
import Button from "../../components/Button";
import {appState, loadBase64PublicKey, loadSign, toast} from '../../net/net';
import {I18n} from "../../language/I18n";
import Toast from "react-native-easy-toast";
import {observer} from 'mobx-react';
import {strlen} from "../../utils/common";





class CreateSign extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      sign:'',
      toast:true
    }
  }

  componentDidMount(){

  }

  handleToast = ()=>{
    this.setState({toast:false});
    this.timer = setTimeout(()=>{
      this.setState({toast:true});
      this.timer && clearTimeout(this.timer)
    },1000)
  };

  render() {
    const {name, sign} = this.state;
    return (
        <View style={{alignItems: 'center',backgroundColor:'#fff',flex:1}}>
          <RegisterInputItem
              onChangeText={(text)=>{
                this.setState({name: text})
              }}
              itemStyle={{marginTop: 30, width: ScreenWidth / 10 * 9,borderRadius:5}}
              source={loginAccount}
              placeholder={I18n.t('inputAccountName')}/>
          <View style={{
            backgroundColor: '#FFF2C8',
            minHeight: 256,
            marginTop: 30,
            borderRadius: 5,
            width: ScreenWidth / 10 * 9,
            alignItems:'center',
          }}>
            <TextInput
                value={sign}
                placeholderTextColor={'#C9C9C9'}
                underlineColorAndroid={'transparent'}
                multiline={true}
                caretHidden={true}
                style={{width: ScreenWidth / 10 * 9 - 24, minHeight: 85,fontSize:17,lineHeight:26}}
                placeholder={I18n.t('clickTheGenerateSignatureButton')}/>
          </View>
          <View style={{marginTop:50,width: ScreenWidth / 10 * 9,flexDirection:'row',justifyContent:'space-between'}}>
            <Button
                onPress={()=>{
                  this.refs.toast.show(I18n.t('copyOK'));
                  Clipboard.setString(sign);
                }}
                title={I18n.t('copySignature')}/>
            <Button
                onPress={()=>{

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

                  const hexPrivateKey = appState.privkeyhex;
                  const base64PublicKey = loadBase64PublicKey(hexPrivateKey);
                  const signData = {};
                  signData.block_id= appState.blockID;
                  signData.fee = 2;
                  signData.name = Buffer.from(name).toString('base64');
                  signData.referrer = base64PublicKey;
                  const sign = loadSign(hexPrivateKey,signData)
                  this.setState({
                    sign: `{"sign":"${sign}","sign_data":${JSON.stringify(signData)}}`
                  })
                }}
                btnStyle={{marginLeft: 17}}
                title={I18n.t('createSignature')}/>
          </View>
          <Toast ref="toast" position={'center'}/>
        </View>
    )
  }
}

export default observer(CreateSign)