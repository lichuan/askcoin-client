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
import loginTb from '../../resource/icons/login_tb.png';
import loginChoose from '../../resource/icons/login_choose.png';

import Button from '../../components/Button';
import InputBox from '../../components/InputBox';
import CommonPopupMenu from './CommonPopupMenu';

export default class LanguageSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      inputLayout:{
        x:0,
        y:0,
        width:0,
        height:0,
      }
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
    this.props.navigation && this.props.navigation.navigate('ApiServerSwitch',{name:'选择节点服务器'})
  }

  switchLanguage() {
    this.popupMenu && this.popupMenu.open();
  }

  render() {

    return (
      <View style={styles.container}>
        <Image
          source={loginBg}
          style={styles.loginBg}/>
        <Text style={styles.titleEN}>
          {'Switch Language'}
        </Text>
        <Text style={styles.titleCN}>
          {'请您选择语言'}
        </Text>

        <InputBox
          onLayout={(e)=>{
            this.setState({
              inputLayout: e.nativeEvent.layout
            })
          }}
          onRightBtnPress={()=>this.switchLanguage()}
          source={loginTb}
          itemStyle={styles.box}
          editable={false}
          value={this.language[this.state.selectedIndex]}
          placeholder={'请选择语言'}
          showRightImage={true}/>

        <Button
          onPress={()=>this.onRegister()}
          btnStyle={styles.bottomBtn}
          title={'进入'}/>

        <CommonPopupMenu
          menuStyle={{
            top:this.state.inputLayout.y + this.state.inputLayout.height,
            left:this.state.inputLayout.x,
          }}
          onItemSelected={(index)=>{
            this.setState({
              selectedIndex:index
            })
          }}
          ref={r=>this.popupMenu = r}
          list={this.language}
          selectedIndex={this.state.selectedIndex}/>
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
  titleEN: {
    fontSize: 20,
    color: '#999999',
    marginTop: 25
  },
  titleCN: {
    fontSize: FONTSIZE.normal,
    color: '#999999',
    marginTop: 13,
  },
  box:{
    marginHorizontal:0,
    height:45,
    marginTop:20
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
  },
  picker:{
    width:325,
    padding:0,
    justifyContent:'center',
    alignSelf:'center',
    marginTop:30
  },
  dropdownStyle:{
    margin:0,
    padding:0,
    height:92
  }
});