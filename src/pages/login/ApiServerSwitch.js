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
import loginApi from '../../resource/icons/login_api.png';

import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import {PopoverPicker} from 'teaset';

export default class ApiServerSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      pickerLayout:{}
    };
  }

  language = [
    '汉语',
    'English'
  ];


  componentWillMount() {

  }

  componentDidMount() {

  }

  onRegister() {
    this.props.navigation && this.props.navigation.navigate('Register',{name:'注册'})
  }

  switchLanguage(items) {
    let {pickerLayout} = this.state;
  }

  render() {
    let pickerItems = this.language.map((lang,id)=>{
      return(
        <View style={styles.pickerItem} key={id}>
          <Text style={styles.pickerText}>
            {lang}
          </Text>
          {
            this.state.selectedIndex === id
              ? <Image style={styles.choose}/>
              : null
          }
        </View>
      )
    });
    return (
      <View style={styles.container}>
        <Image
          source={loginBg}
          style={styles.loginBg}/>
        <Text style={styles.title}>
          {'请您选择API节点服务器'}
        </Text>
        <InputBox
          onLayout={e => {
            this.setState({
              pickerLayout:e.nativeEvent.layout
            })
          }}
          onRightBtnPress={()=>this.switchLanguage(pickerItems)}
          source={loginApi}
          itemStyle={styles.box}
          editable={false}
          placeholder={'请选择API节点服务器'}
          showRightImage={true}/>

        <Button
          onPress={()=>this.onRegister()}
          btnStyle={styles.bottomBtn}
          title={'进入问答社区'}/>
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
  loginBg: {
    width: ScreenWidth,
    height: ScreenWidth / 1.693
  },
  bottomBtn: {
    width:325,
    marginTop:29
  },
  title: {
    fontSize: FONTSIZE.normal,
    color: '#999999',
    marginVertical:45
  },
  box:{
    borderRadius:5,
    borderWidth:1,
    borderColor:COLOR.borderColor,
    backgroundColor:'#fffbdf',
    width: 325,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:15,
  },
  pickerItem:{
    borderWidth:1,
    borderColor:COLOR.borderColor,
    backgroundColor:'#fffbdf',
    width: 325,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:15,
    justifyContent:'space-between',
    alignSelf:'center'
  },
  icon:{
    width: 16,
    height: 17,
  },
  input:{
    padding: 0,
    flex: 1,
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor,
    marginLeft: 15
  },
  loginBt:{
    width:17,
    height:10
  },
  pickerText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor
  },
  choose:{
    width:19,
    height:15
  }
});