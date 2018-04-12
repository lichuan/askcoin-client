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
  KeyboardAvoidingView
} from 'react-native';
import RegisterInputItem from '../../components/RegisterInputItem';
import loginBg from '../../resource/icons/login_bg.png';
import loginAccount from '../../resource/icons/login_account.png';
import loginPassword from '../../resource/icons/login_password.png';
import loginConfirm from '../../resource/icons/login_confirm.png';
import Button from '../../components/Button';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  onRegister() {
    this.props.navigation && this.props.navigation.navigate('RegisterSuccess',{name:'注册成功'})
  }

  onRestore() {
    this.props.navigation && this.props.navigation.navigate('WalletRestore',{name:'恢复钱包'})
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={'position'}
          style={styles.keyboard}>
          <Image
            source={loginBg}
            style={styles.loginBg}/>
          <RegisterInputItem
            itemStyle={{marginTop:50}}
            source={loginAccount}
            placeholder={'Account'}/>
          <RegisterInputItem
            secureTextEntry={true}
            itemStyle={{marginTop:30}}
            source={loginPassword}
            placeholder={'Password'}/>
          <RegisterInputItem
            secureTextEntry={true}
            itemStyle={{marginTop:30}}
            source={loginConfirm}
            placeholder={'Confirm'}/>
          <View style={styles.bottomBtn}>
            <Button
              onPress={()=>this.onRegister()}
              title={'立即注册'}/>
            <Button
              onPress={()=>this.onRestore()}
              btnStyle={{marginLeft:17}}
              title={'从钱包恢复'}/>
          </View>
        </KeyboardAvoidingView>
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
    height: ScreenWidth / 1.693
  },
  bottomBtn: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 50
  },
  keyboard:{
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  }
});