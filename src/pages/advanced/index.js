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
  ScrollView,
  StatusBar,
  Dimensions,
  Platform,
  Modal,
  BackAndroid,
} from 'react-native';
import { I18n } from '../../language/I18n'
import TopicStore from '../../stores/topic'
import RowItem from '../../components/RowItem';
import HeaderView from '../../components/HeaderView';
import NavButton from '../../components/NavButton';
import arrowLeft from '../../resource/icons/arrow_left.png';
import Button from "../../components/Button";
import ModalContainer from "../../views/modalContainer";
import {exitApp, closeWS, appState, Topic} from '../../net/net'
import {deleteAll} from "../../utils/db";
const SharedPreferences = require('react-native-shared-preferences');
import lan_img from '../../resource/icons/lan.png'
import add_img from '../../resource/icons/select.png'
import top_img from '../../resource/icons/toop.png'
import sign_img from '../../resource/icons/sign_more.png'
import key_img from '../../resource/icons/key_more.png'
import about_img from '../../resource/icons/about.png'
import {observer} from 'mobx-react';





const IphoneTop = isIphoneX() ? 40 : 20;

 class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quit: false,
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    SharedPreferences.getItem('apilist',(res)=>{
      console.log('api------------->1',appState.api)

      JSON.parse(res).forEach((item=>{
          if(item.address === appState.api){
            console.log('api------------->',appState.api)
            appState.apiName = item.name
          }
      }))
    })
    /*this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(false,false);
    });*/
  }

  componentWillUnmount() {

  }

  toApiSwitch() {
    this.props.navigation && this.props.navigation.navigate('ApiSwitch', {name: 'API选择'})
  }

  toRankList() {
    this.props.navigation && this.props.navigation.navigate('Top', {name: 'TOP 100'});
  }

  createSign() {
    this.props.navigation && this.props.navigation.navigate('CreateSign', {name: '生成注册签名'});
  }

  toMySign() {
    this.props.navigation && this.props.navigation.navigate('MySign', {name: '我的私钥'});
  }

  toLauSwitch(){
    this.props.navigation && this.props.navigation.navigate('LauSwitch', {name: '语言'});
  }

  toAbout(){
    this.props.navigation && this.props.navigation.navigate('About', {name: '关于'});
  }

  onOk=()=>{
    this.setState({quit:false});
    appState.loginStatus = '-1';
    TopicStore.clear();
    SharedPreferences.setItem('app_is_auto_login', '-1')
    SharedPreferences.getItem('app_is_auto_login',(res)=>{
      console.log('exit app---->',res)
    });
    SharedPreferences.removeItem('TOPICLIST');
    SharedPreferences.removeItem('QUESTIONLIST');
    SharedPreferences.removeItem('ANSWERLIST');
    SharedPreferences.removeItem('ANSWERLIST');
    SharedPreferences.removeItem('privkeyhex');
    SharedPreferences.removeItem('pubkeyhex');
    deleteAll()

    closeWS();
    //this.props.navigation && this.props.navigation.navigate('Register', {name: '注册'});
  };

  onCancel=()=>{
    this.setState({quit:false})
  }

  render() {
    const {quit} = this.state
    return (
        <View style={styles.container}>
          <HeaderView
              headerTitle={I18n.t('more')}
              headerStyle={styles.header}
              leftItems={() =>
                  <NavButton
                      btnStyle={{paddingHorizontal: 0}}
                      data={{
                        type: 'image',
                        uri: arrowLeft,
                        onPress: () => {
                          this.props.navigation && this.props.navigation.goBack();
                        }
                      }}/>
              }/>
          <ScrollView
              showsVerticalScrollIndicator={false}
              style={STYLE.BACKGROUND}>
            <RowItem
                icon={lan_img}
                onPress={() => {
                  this.toLauSwitch()
                }}
                name={I18n.t('language')}
                desc={I18n.locale === 'en'?'English':'中文'}/>
            <RowItem
                icon={add_img}
                onPress={() => {
                  this.toApiSwitch()
                }}
                name={I18n.t('APISelect')}
                desc={appState.apiName}/>
            <RowItem
                icon={top_img}
                onPress={() => {
                  this.toRankList()
                }}
                name="TOP 100"/>
            <RowItem
                icon={sign_img}
                onPress={() => {
                  this.createSign()
                }}
                name={I18n.t('generateSignature')}/>
            <RowItem
                icon={key_img}
                onPress={() => {
                  this.toMySign()
                }}
                name={I18n.t('myPrivateKey')}/>
            <RowItem
                icon={about_img}
                onPress={() => {
                  this.toAbout()
                }}
                name={I18n.t('about')}/>
            <Button title={I18n.t('exitAccount')} titleStyle={{color: '#fff'}}
                    onPress={()=>{
                      this.setState({quit:true})
                    }}
                    btnStyle={{
                      height:48,
                      backgroundColor: '#FD808F',
                      width: ScreenWidth / 5 * 4,
                      marginTop: ScreenHeight/8,
                      alignSelf: 'center'
                    }}/>
          </ScrollView>
          <Modal
              transparent
              visible={quit}>
            <ModalContainer>
              <View style={styles.tipView}>
                <ScrollView>
                  <Text style={styles.tipTitle}>{I18n.t('exitAccount')}</Text>
                  <Text style={styles.tip}>{I18n.t('sureExitApp')}</Text>
                </ScrollView>
                <View style={{flexDirection: 'row', borderTopColor: '#E7E7E7', borderTopWidth: 1}}>
                  <TouchableOpacity
                      style={[styles.tipBtn, {borderRightColor: '#E7E7E7', borderRightWidth: 1}]}
                      onPress={this.onCancel}>
                    <Text style={styles.btnTitle}>{I18n.t('cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.tipBtn}
                      onPress={this.onOk}>
                    <Text style={styles.btnTitle}>{I18n.t('OK')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalContainer>
          </Modal>
        </View>
    )
  }
}

export default observer(index)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor: COLOR.bgColor
  },
  header: {
    backgroundColor: COLOR.primaryColor
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
    color:'#333333'
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
  tip:{
    fontSize:15,
    lineHeight:23,
    paddingHorizontal:24,
    marginTop:6,
    marginBottom:24
  }
});