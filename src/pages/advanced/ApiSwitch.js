/**
 * Created by xiaoming on 2018/3/27.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList, Modal, ScrollView
} from 'react-native';
import SwipeOut from 'react-native-swipeout';
import ApiPopup from './ApiPopup';
import NavButton from '../../components/NavButton';
import HintCell from '../../components/HintCell';
import AlertControl from '../../components/AlertControl';
import {I18n} from "../../language/I18n";
import ModalContainer from "../../views/modalContainer";
import choose from '../../resource/icons/login_choose.png'
import {appState, switchApi, initRouter, apiSaved,confirmNet, ws, setRouterName} from '../../net/net';
import {deleteType0Topics} from '../../utils/db'
import TopicStore from '../../stores/topic'
const SharedPreferences = require('react-native-shared-preferences');



export default class ApiSwitch extends Component {


  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      headerRight: (
          <NavButton
              data={{
                type: 'text',
                text: I18n.t('add'),
                onPress: () => {
                  state.params.onAdd && state.params.onAdd()
                }
              }}
          />
      )
    };
  };


  constructor(props) {
    super(props);
    this.state = {
      deleteTip: false,
      api: appState.apiIndex,
      apiList:[],
      apied:'',
      delIndex:0
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    appState.apiPage = true;
    initRouter(this);
    this.props.navigation && this.props.navigation.setParams({
      onAdd: () => {
        this.apiPopup && this.apiPopup.open();
      }
    });

    SharedPreferences.getItem('apilist',(res)=>{
      this.setState({apiList:JSON.parse(res)})
      const api = JSON.parse(res).indexOf(appState.api);
    })
  }

  componentWillUnmount(){
    confirmNet();
    appState.apiPage = false;
    appState.switchAPI = false
  }

  render() {
    setRouterName('ApiSwitch');
    const {deleteTip, apiList} = this.state
    return (
        <View style={styles.container}>
          <HintCell hintTitle={I18n.t('slideToLeft')}/>
          <FlatList
              style={styles.list}
              data={apiList}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => this.renderItem(item, index)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}/>
          <ApiPopup
              onAdd={(name, address)=>{
                this.setState({apiList: apiList.concat({name, address})},()=>{
                  SharedPreferences.setItem('apilist', JSON.stringify(apiList.concat({name, address})))
                })
              }}
              ref={(r) => this.apiPopup = r}/>
          <AlertControl ref={r => {
            this._alert = r
          }}/>
          <Modal
              transparent
              visible={deleteTip}>
            <ModalContainer>
              <View style={styles.tipView}>
                <ScrollView>
                  <Text style={styles.tipTitle}>{I18n.t('deleteAPI')}</Text>
                  <Text style={styles.tip}>{I18n.t('sureDelAPI')}</Text>
                </ScrollView>
                <View style={{flexDirection: 'row', borderTopColor: '#E7E7E7', borderTopWidth: 1}}>
                  <TouchableOpacity
                      style={[styles.tipBtn, {borderRightColor: '#E7E7E7', borderRightWidth: 1}]}
                      onPress={() => {
                        this.setState({deleteTip: false})
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('cancel')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.tipBtn}
                      onPress={() => {
                        this.setState({deleteTip: false});
                        if(apiList[this.state.delIndex].address === appState.api){
                          ws.close();
                          appState.api = '';
                          SharedPreferences.removeItem('removeItem');
                        }
                         apiList.splice(this.state.delIndex, 1);
                         this.setState({apiList});
                        SharedPreferences.setItem('apilist', JSON.stringify(apiList))
                      }}>
                    <Text style={styles.btnTitle}>{I18n.t('OK')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ModalContainer>
          </Modal>
        </View>
    )
  }

  renderItem(item, index) {
    let swipeOutBtns = [
      {
        text: I18n.t('remove'),
        backgroundColor: '#FD808F',
        color: COLOR.whiteColor,
        onPress: () => {
          this.setState({delIndex:index})
          this.setState({deleteTip: true});
        }
      }
    ];
    return (
        <SwipeOut
            autoClose={true}
            backgroundColor={COLOR.whiteColor}
            buttonWidth={64}
            right={swipeOutBtns}>
          <TouchableOpacity onPress={() => {
            deleteType0Topics();
            // TopicStore.handleTopics([])
            // TopicStore.handleQuestions([])
            // TopicStore.handleAnswers([])

            appState.apiName = item.name
            SharedPreferences.setItem('APIADDRESS',item.address);
            apiSaved.api = item.address;
            this.setState({api: index, apied: item.address});
            appState.api = item.address;
            switchApi();
          }}>
            <View style={styles.item}>
              <View>
                <Text style={styles.title}>
                  {item.name}
                </Text>
                <Text style={styles.addr}>{item.address}</Text>
              </View>
              {item.address === appState.api ? (<Image source={choose}/>) : (null)}
            </View>
          </TouchableOpacity>
        </SwipeOut>
    )
  }

  renderItemSeparator() {
    return (
        <View style={styles.line}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  list: {
    backgroundColor: COLOR.bgColor,
    flex: 1
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 65,
    paddingHorizontal: 15,
    width: ScreenWidth
  },
  title: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor
  },
  line: {
    height: 1,
    backgroundColor: COLOR.diverColor
  },
  addr: {
    color: '#666666',
    fontSize: 15
  },
  btnTitle: {
    fontSize: 17,
    color: COLOR.normalColor,
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
    color: '#333333'
  },
  tip: {
    fontSize: 15,
    lineHeight: 23,
    paddingHorizontal: 24,
    marginTop:6,
    marginBottom:24,
  },
  tipBtn: {
    height: 52,
    backgroundColor: '#fff',
    width: ScreenWidth / 10 * 9 / 2,
    color: COLOR.primaryColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
});