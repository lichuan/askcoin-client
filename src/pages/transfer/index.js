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
  ImageBackground,
  FlatList,
  StatusBar,
  Platform,
  KeyboardAvoidingView, Modal, Clipboard, ScrollView
} from 'react-native';
import UserStore from '../../stores/user'
import {observer} from 'mobx-react'
import zzBg from '../../resource/icons/zz_bg.png';

import userBg from '../../resource/avatars/1.png';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import zzMoneyIcon from '../../resource/icons/zz_money.png';
import zzBtIcon from '../../resource/icons/zz_bt.png';
import zzBzIcon from '../../resource/icons/zz_bz.png';
import zzIdIcon from '../../resource/icons/zz_id.png';

import InputBox from '../../components/InputBox';
import NavBar from '../../components/NavBar';
import Button from '../../components/Button';
import ModalContainer from '../../views/modalContainer'
import {I18n} from '../../language/I18n';
import {queryAccount, transfer, History, toast, handleErrorModal, appState, initRouter} from '../../net/net'
import {defaultAvatars} from "../../resource/avatars";
import styled from 'styled-components/native';

var Buffer = require('buffer/').Buffer;


Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //month
    "d+" : this.getDate(),                    //day
    "h+" : this.getHours(),                   //hour
    "m+" : this.getMinutes(),                 //min
    "s+" : this.getSeconds(),                 //s
    "q+" : Math.floor((this.getMonth()+3)/3), //
    "S"  : this.getMilliseconds()             //ms
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}


String.prototype.format = function() {
  if (arguments.length == 0) return this;
  var obj = arguments[0];
  var s = this;
  for (var key in obj) {
    s = s.replace(new RegExp("\\{\\{" + key + "\\}\\}", "g"), obj[key]);
  }
  return s;
}

const Triangle = styled.View`
    border-bottom-color: transparent;
    border-top-color: transparent;
    border-left-color: #E2E2E4;
    border-bottom-width: 6px;
    border-left-width: 6px;
    border-top-width: 6px;
`;

const Line = styled.View`
  height: 100%;
  width: 2px;
  background-color: #E2E2E4;
`


const IphoneTop = isIphoneX() ? 40 : 20;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      memo: false,
      id: '',
      amount: '',
      memoContent: '',
      memoModalContent: ''
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    initRouter(this)
    /*this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(false);
    });*/
  }

  componentWillUnmount() {
    //this._navListener.remove();
  }

  render() {
    return (
        <KeyboardAvoidingView
            behavior={'position'}
            contentContainerStyle={styles.container}
            style={styles.container}>
          <ScrollView keyboardShouldPersistTaps={true}>
          <View style={styles.container}>
            {this.renderHeader()}
            {
              this.state.selectedIndex === 0
                  ? this.renderFirstPage()
                  : this.renderSecondPage()
            }
          </View>
          <Modal transparent
                 visible={this.state.memo}>
            <ModalContainer>
              <View style={{
                width: ScreenWidth / 8 * 7,
                paddingVertical: 20,
                paddingHorizontal: 15,
                alignItems: 'center',
                backgroundColor: '#fff',
                borderRadius: 5
              }}>
                <Text style={{fontSize: 18}}>{'memo'}</Text>
                <Text
                    style={{
                      backgroundColor: '#FFF2C8',
                      width: ScreenWidth / 8 * 7 - 30,
                      padding: 10,
                      marginTop: 20,
                      borderRadius: 5
                    }}
                >{Buffer.from(this.state.memoModalContent,'base64').toString()}</Text>
                <View style={{
                  width: ScreenWidth / 8 * 7 - 30,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 24
                }}>
                  <Button title={I18n.t('copyMemo')} onPress={()=>{
                    Clipboard.setString(Buffer.from(this.state.memoModalContent, 'base64').toString());
                    toast(I18n.t('copyOK'));
                  }}/>
                  <Button title={I18n.t('close')}
                          onPress={() => {
                            this.setState({memo: false})
                          }}/>
                </View>
              </View>
            </ModalContainer>

          </Modal>
          </ScrollView>
        </KeyboardAvoidingView>
    )
  }

  renderHeader() {
    return (
        <ImageBackground
            source={zzBg}
            style={styles.bg}>
          <NavBar
              titleList={[I18n.t('transfer'), I18n.t('transactionHistory')]}
              onPress={() => {
                this.props.navigation && this.props.navigation.goBack();
              }}
              onChangeSegment={(index) => {
                this.setState({
                  selectedIndex: index
                });
              }}/>
          <Image
              resizeMode={'contain'}
              source={defaultAvatars[UserStore.avatar - 1].avatar}
              style={styles.header}/>
          <View style={styles.headerItem}>
            <Text style={styles.nameText}>{Buffer.from(UserStore.name,'base64').toString()}</Text>
            <Text style={styles.idText}>{`ID:${UserStore.id}`}</Text>
          </View>
          <View style={styles.headerItem}>
            <Text style={styles.amtTitle}>{I18n.t('balance')}</Text>
            <View style={styles.amtItem}>
              <Image
                  resizeMode={'contain'}
                  style={styles.amtImg}
                  source={zzJbIcon}/>
              <Text style={styles.amtText}>{UserStore.balance}</Text>
            </View>
          </View>
        </ImageBackground>
    )
  }

  renderFirstPage() {
    const {amount, memoContent} = this.state;
    return (
        <View style={styles.firstPage}>
          <View style={styles.content}>
            <InputBox
                onChangeText={(text) => {
                  this.setState({id: text === ''?'':parseInt(text)})
                  setTimeout(() => {
                    if(!this.state.id || this.state.id === 0){
                      UserStore.handleQueryUser({
                        name: '',
                        avatar: -1,
                        id: 0,
                        pubkey:''
                      })
                    }else if(parseInt(text) === this.state.id) {
                      queryAccount(this.state.id)
                    }
                  }, 500)
                }}
                value={this.state.id.toString()}
                keyboardType={'numeric'}
                source={zzIdIcon}
                editable={true}
                placeholder={I18n.t('idNumber')}
                showRightImage={false}/>
            <Image
                source={zzBtIcon}
                style={styles.bt}/>
            <View style={styles.tx}>
              <View style={styles.avatarBg}>
                <Image
                    resizeMode={'contain'}
                    source={UserStore.queryUser.avatar === -1 ? userBg : defaultAvatars[UserStore.queryUser.avatar-1].avatar}
                    style={styles.user}/>
              </View>
              <TextInput
                  editable={false}
                  underlineColorAndroid={'transparent'}
                  value={UserStore.queryUser.name === '' ? I18n.t('autoName') : Buffer.from(UserStore.queryUser.name, 'base64').toString()}
                  style={[styles.nickname,{color: UserStore.queryUser.name === ''? '': '#BE8200'}]}
              />
            </View>

            <InputBox
                value={this.state.amount.toString()}
                onChangeText={(text) => {
                  this.setState({amount: text === ''? '': parseInt(text)})
                }}
                keyboardType={'numeric'}
                itemStyle={styles.moneyItem}
                source={zzMoneyIcon}
                editable={true}
                placeholder={I18n.t('transferAmount')}
                showRightImage={false}/>
            <InputBox
                value={this.state.memoContent}
                onChangeText={(text) => {
                  this.setState({memoContent: text})
                }}
                itemStyle={styles.bzItem}
                source={zzBzIcon}
                editable={true}
                placeholder={I18n.t('inputMemo')}
                showRightImage={false}/>
          </View>
          <Button
              onPress={() => {
                initRouter(this)
                console.log('id------>',this.state.id)
                if(this.state.id === '' || isNaN(this.state.id)){
                  toast(I18n.t('inputError13'))
                  return
                }
                if(this.state.id === 0 ){
                  toast(I18n.t('inputError17'))
                  return
                }
                if(amount === '' || isNaN(this.state.amount)){
                  toast(I18n.t('inputError14'))
                  return
                }
                if(amount === 0){
                  toast(I18n.t('inputError16'))
                  return
                }
                transfer(amount, memoContent)
              }}
              title={I18n.t('send')}
              btnStyle={styles.bottomBtn}/>
        </View>
    )
  }

  renderSecondPage =()=> {
    return (
        <FlatList
            style={styles.list}
            data={History.history.slice().reverse()}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => this.renderItem(item, index)}
            ItemSeparatorComponent={() => this.renderItemSeparator()}/>
    )
  }

  loadHistoryContent = (history) => {
    const returnHistory = {};
    if(history.target_name){
      history.name = Buffer.from(history.target_name, 'base64').toString();
    }
    switch (history.type) {
      case 1:
        returnHistory.title = I18n.t('tt1');
        returnHistory.content = I18n.t('tx1',history);
        break;
      case 2:
        returnHistory.title = I18n.t('tt2');
        returnHistory.content = I18n.t('tx2',history);
        break;
      case 3:
        returnHistory.title = I18n.t('tt1');
        returnHistory.content = I18n.t('tx3', history);
        break;
      case 4:
        returnHistory.title = I18n.t('tt5');
        returnHistory.content = I18n.t('tx4', history);
        break;
      case 5:
        returnHistory.title = I18n.t('tt1');;
        returnHistory.content = I18n.t('tx5',history);
        break;
      case 6:
        returnHistory.title = I18n.t('tt1');;
        returnHistory.content = I18n.t('tx6', history);
        break;
      case 7:
        returnHistory.title = I18n.t('tt4');
        returnHistory.content = I18n.t('tx7', history);
        break;
      case 8:
        returnHistory.title = I18n.t('tt4');
        returnHistory.content = I18n.t('tx8', history);
        break;
      case 9:
        returnHistory.title = I18n.t('tt1');
        returnHistory.content = I18n.t('tx9', history);
        break;
      case 10:
        returnHistory.title = I18n.t('tt5');
        returnHistory.content = I18n.t('tx10', history);
        break;
      case 11:
        returnHistory.title = I18n.t('tt6');
        returnHistory.content = I18n.t('tx11', history);
        break;
      case 12:
        returnHistory.title = I18n.t('tt6');
        returnHistory.content = I18n.t('tx12', history);
        break;
      default:
    }
    return returnHistory;
  };

  loadConfirms = (app_block_id,block_id)=>{
    let confirms = 0;
    if(app_block_id - block_id +1 < 0 ||  app_block_id - block_id +1 === 0 ){
      confirms = 0;
    }else if(app_block_id - block_id +1 > 1000) {
      confirms = 1000
    }else {
      confirms = app_block_id - block_id +1
    }
    return confirms === 1000? 'confirmed': `${confirms} confirms`
  };


  renderItem(item, index) {
    const date = new Date(item.utc*1000);
    return (
        <View style={styles.item}>
          <View style={styles.leftItem}>
            <Text style={styles.date}>
              {`${date.format("yyyy/MM/dd")}`}
            </Text>
            <Text style={[styles.date, {marginTop: 14}]}>
              {`${date.toLocaleTimeString()}`}
            </Text>
          </View>
          <Line/>
          <Triangle/>
          {item.target_id === 0 ?(
              <Image
                  style={styles.avatar}
                  source={defaultAvatars[UserStore.avatar-1].avatar}/>
          ): (
              <Image
                  style={styles.avatar}
                  source={defaultAvatars[item.target_avatar -1].avatar}/>
          )}
          <View style={styles.rightItem}>
            <View style={styles.titleItem}>
              <Text style={styles.title}>{this.loadHistoryContent(item).title}</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                <Text style={styles.moneyText}>{[1,3,4,5,6,7,9].indexOf(item.type)=== -1?'+':'-'}</Text>
                <Image
                    resizeMode={'contain'}
                    source={zzJbIcon}
                    style={styles.itemMoney}/>
                <Text style={[styles.moneyText, {marginLeft: 4}]}>{item.change}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => {

            }}>
              <Text
                  style={styles.desc}>
                {this.loadHistoryContent(item).content}
              </Text>
            </TouchableOpacity>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 8}}>
                  {item.memo ? (
                      <TouchableOpacity onPress={() => {
                        this.setState({memo: true, memoModalContent: item.memo})
                      }}>
                        <Text
                            style={{
                              color: '#BE8200',
                              backgroundColor: '#FFE457',
                              fontSize: 12,
                              borderRadius: 5,
                              paddingHorizontal: 4
                            }}>{'memo'}</Text>
                      </TouchableOpacity>
                  ):(null)}
                  <Text style={{
                    color: '#3C7C65',
                    backgroundColor: '#7BF0C5',
                    fontSize: 12,
                    marginLeft: 12,
                    borderRadius: 5,
                    paddingHorizontal: 4
                  }}>{item.confirms}</Text>
                </View>
          </View>
        </View>
    )
  }

  renderItemSeparator() {
    return (
        <View style={{height: 1, backgroundColor: COLOR.bgColor}}/>
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
  bg: {
    width: ScreenWidth,
    height: ScreenWidth / 1.984,
    alignItems: 'center'
  },
  header: {
    width: 65,
    height: 65,
    marginVertical: 15
  },
  nameText: {
    fontSize: FONTSIZE.normal,
    color: '#BE8200',
  },
  idText: {
    marginLeft: 15,
    fontSize: FONTSIZE.small,
    color: '#BE8200'
  },
  amtTitle: {
    fontSize: 14,
    color: '#BE8200'
  },
  amtText: {
    fontSize: 14,
    color: '#BE8200',
  },
  headerItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  amtItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  amtImg: {
    width: 14,
    height: 18,
    marginRight: 8
  },
  firstPage: {
    flex: 1,
    padding: 10
  },
  content: {
    backgroundColor: COLOR.whiteColor,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  moneyItem: {
    marginTop: 17,
  },
  bzItem: {
    marginTop: 14
  },
  bt: {
    marginTop: 15,
    width: 34,
    height: 29
  },
  tx: {
    paddingHorizontal: 8,
    width: 325,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  user: {
    width: 57,
    height: 57,
  },

  grayUser: {
    width: 57,
    height: 57,
    borderRadius: 28.5,
    left: 9,
    position: 'absolute',
    backgroundColor: '#cccc'
  },

  bottomBtn: {
    width: 325,
    marginTop: 2,
    alignSelf: 'center'
  },
  list: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
    paddingHorizontal: 10
  },
  item: {
    flexDirection: 'row',
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
  },
  leftItem: {
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  date: {
    fontSize: FONTSIZE.small,
    color: '#f3bd7c'
  },
  line: {
    width: 9,
    height: '100%',
    resizeMode: 'contain',
    marginRight: 14
  },
  avatar: {
    width: 57,
    height: 57,
    resizeMode: 'contain'
  },
  rightItem: {
    marginTop: 20,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 24,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    marginTop: 8,
    fontSize: FONTSIZE.normal,
    color: '#f1ac08',
  },
  moneyText: {
    fontSize: 14,
    color: '#F0AB51'
  },
  itemMoney: {
    width: 14,
    height: 18,
    marginLeft: 8
  },
  desc: {
    fontSize: FONTSIZE.small,
    color: '#555',
    lineHeight: 20
  },
  avatarBg: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFFBDF',
    borderWidth: 1,
    borderColor: COLOR.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  nickname: {
    backgroundColor: '#FFFBDF',
    textAlign: 'center',
    height: 40,
    marginLeft: -8,
    flex: 1,
    paddingLeft: -8,
    borderRadius: 5,
    borderColor: COLOR.borderColor,
    borderWidth: 1,
  }
});