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
  StyleSheet
} from 'react-native';

import loginTitleBg from '../../resource/icons/login_title.png';
import loginFcBg from '../../resource/icons/login_fc.png';
import Button from '../../components/Button';

export default class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onRestore(){
    this.props.navigation && this.props.navigation.navigate('WalletRestore',{name:'恢复钱包'})
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
          {'恭喜您注册成功'}
        </Text>
        <View style={styles.desc}>
          <Text style={styles.descTitle}>
            {'温馨提示'}
          </Text>
          <Text style={styles.descOne}>
            {'请务必记好你的密码，并备份好您的钱包文件，'}
          </Text>
          <Text style={styles.descTwo}>
            {'否则你的余额将永远失去哦~'}
          </Text>
        </View>
        <Button
          onPress={()=>this.onRestore()}
          btnStyle={styles.btn}
          title={'备份钱包'}/>
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
  titleBg:{
    width: 191,
    height: 164,
    marginTop: 15,
  },
  fc:{
    width: 72.5,
    height: 77.5,
    marginTop: 30
  },
  title:{
    marginTop: 17,
    fontSize: FONTSIZE.primary,
    color: COLOR.primaryTextColor,
    fontWeight:'bold'
  },
  desc: {
    width: 325,
    height: 95,
    marginTop: 34,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff2c8',
    borderRadius: 5
  },
  descTitle:{
    fontSize: FONTSIZE.small,
    color: COLOR.normalTextColor,
    marginVertical: 8
  },
  descOne:{
    marginTop: 8,
    fontSize: FONTSIZE.small,
    color: COLOR.normalTextColor,
  },
  descTwo:{
    fontSize: FONTSIZE.small,
    color: COLOR.normalTextColor,
    marginTop: 8,
  },
  btn:{
    marginTop:35,
    width:325
  }
});