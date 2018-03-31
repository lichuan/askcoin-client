/**
 * Created by xiaoming on 2018/3/25.
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
import Button from '../../components/Button';
import loginTitleBg from '../../resource/icons/login_title.png';
import loginPassword from '../../resource/icons/login_password.png';

export default class WalletRestore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  selectFile(){

  }

  onRestore(){
    this.props.navigation && this.props.navigation.navigate('Tabs');
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          contentContainerStyle={{alignItems:'center'}}
          behavior={'position'}
          keyboardVerticalOffset={50}
          style={styles.keyboard}>
          <Image
            style={styles.titleBg}
            source={loginTitleBg}/>

          <Button
            onPress={()=>this.selectFile()}
            btnStyle={styles.fileBtn}
            title={'选择钱包文件'}/>

          <View style={styles.inputItem}>
            <Image
              style={styles.icon}
              source={loginPassword}/>
            <TextInput
              underlineColorAndroid={'transparent'}
              style={styles.input}
              secureTextEntry={true}
              placeholder={'请输入钱包密码~'}
              placeholderTextColor={COLOR.grayTextColor}/>
          </View>

          <Button
            onPress={()=>this.onRestore()}
            btnStyle={styles.bottomBtn}
            title={'开始恢复'}/>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.whiteColor,
    alignItems:'center'
  },
  titleBg:{
    width: 191,
    height: 164,
    marginTop: 15,
  },
  bottomBtn:{
    width:279,
    marginTop:56
  },
  fileBtn:{
    width:173,
    marginTop:45
  },
  inputItem:{
    width: 279,
    height: 40,
    flexDirection:'row',
    alignItems:'center',
    marginTop: 30,
    borderBottomWidth:1,
    borderBottomColor:COLOR.borderColor
  },
  input:{
    padding:0,
    flex:1,
    marginLeft:15,
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor
  },
  icon:{
    width:15,
    height:17
  },
  keyboard:{
    flex: 1,
    backgroundColor: COLOR.whiteColor,
  }
});