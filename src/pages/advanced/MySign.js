import React, {Component} from 'react';
import {Clipboard, Image, Text, TextInput, View} from "react-native";
import Button from "../../components/Button";
import warning from '../../resource/icons/warning.png'
import {I18n} from "../../language/I18n";
import Toast from "react-native-easy-toast";
import {appState} from "../../net/net";


class MySign extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const privkeyhex  = appState.privkeyhex;
    const privb64 = Buffer.from(privkeyhex, 'hex').toString('base64')
    return (
        <View style={{width: ScreenWidth, alignItems: 'center',backgroundColor:'#fff',flex:1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: ScreenWidth / 10 * 9,marginTop:18}}>
            <Image style={{width: 20, height: 20}} source={warning}/>
            <Text style={{color: '#FF2828', marginLeft: 6}}>{I18n.t('safetyTips')}</Text>
          </View>

          <Text style={{
            backgroundColor: '#FFFCF1',
            marginTop: 12,
            borderRadius: 5,
            padding: 14,
            width: ScreenWidth / 10 * 9,
            lineHeight:24
          }}>
            {I18n.t('backUpYourPrivateKey')}
          </Text>

          <TextInput
              multiline
              underlineColorAndroid={'transparent'}
              value={privb64}
              style={{width:ScreenWidth / 10 * 9,padding:14,backgroundColor:'#FFF2C8',marginTop:41,fontSize:17,lineHeight:24}}
          />
          
          <Button
              onPress={()=>{
                Clipboard.setString(privb64);
                this.refs.toast.show(I18n.t('copyOK'));
              }}
              title={I18n.t('copyPrivateKey')} btnStyle={{backgroundColor:'#FDF187',width:ScreenWidth/5*4,marginTop:52,color:'#BE8200'}}/>
          <Toast ref="toast" position={'center'}/>
        </View>
    )
  }
}

export default MySign