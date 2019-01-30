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
  StatusBar,
  Platform,
  ImageBackground,
  Animated,
  ScrollView
} from 'react-native';
import { I18n } from '../../language/I18n'

import MyAnswer from './MyAnswer';
import MyQuestion from './MyQuestion';

import myBg from '../../resource/icons/my_bg.png';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import HeaderView from '../../components/HeaderView';
import arrowLeft from '../../resource/icons/arrow_left.png';
import NavButton from '../../components/NavButton';
import MyBtTw from '../../resource/icons/my_bt_tw.png'
import SwipeTopBar from '../../components/SwipeTopBar';
import UserStore from '../../stores/user';
import {defaultAvatars} from "../../resource/avatars";
const Buffer = require('buffer/').Buffer;
import {observer} from 'mobx-react'




const IphoneTop = isIphoneX() ? 40 : 20;

class index extends Component {
  tabs = [I18n.t('myQuestions'),I18n.t('myAnswers')];
  constructor(props) {
    super(props);
    this.state = {
      scrollValue:new Animated.Value(0),
      selectedPageIndex:0
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[1]}>
          {this.renderHeader()}
          {this.renderTabBar()}
          {this.renderPage()}
        </ScrollView>
        {this.renderImageButton()}
      </View>
    )
  }

  askQuestion(){
    this.props.navigation && this.props.navigation.navigate('AskQuestion');
  }

  renderHeader(){
    return(
      <ImageBackground
        source={myBg}
        style={styles.bg}>
        <HeaderView
          headerTitle={I18n.t('my')}
          leftItems={()=>
            <NavButton
              btnStyle={{paddingHorizontal:0}}
              data={{
                type:'image',
                uri:arrowLeft,
                onPress:()=>{
                  this.props.navigation && this.props.navigation.goBack();
                }
              }}
            />
          }/>
        <Image
            resizeMode={'contain'}
          source={defaultAvatars[UserStore.avatar-1].avatar}
          style={styles.header}/>
        <Text style={styles.title}>
          {Buffer.from(UserStore.name,'base64').toString()}
        </Text>
        <Text style={styles.idText}>
          {`#${UserStore.id}`}
        </Text>
        <View style={styles.amtItem}>
          <Text style={styles.amtTitle}>{I18n.t('balance')}</Text>
          <Image
              resizeMode={'contain'}
            style={styles.amtImg}
            source={zzJbIcon}/>
          <Text style={styles.amtText}>{UserStore.balance}</Text>
        </View>
      </ImageBackground>
    )
  }


  renderTabBar(){
    return(
      <View style={styles.tabBar}>
        <SwipeTopBar
          goToPage={(index)=>{
            if(index === 0){
              this.state.scrollValue.setValue(0);
            }else {
              this.state.scrollValue.setValue(1);
            }
            this.setState({
              selectedPageIndex:index
            })
          }}
          tabs={this.tabs}
          activeTab={this.state.selectedPageIndex}
          scrollValue={this.state.scrollValue}
          containerWidth={ScreenWidth * 2 / 3 }
          style={{width:ScreenWidth * 2 / 3}}
          inactiveTextColor="#9a9a99"
          activeTextColor="#fbb422"
          textStyle={styles.tabText}
          underlineStyle={styles.tabBarUnderlineStyle}/>
      </View>
    )
  }

  renderPage(){
    if(this.state.selectedPageIndex === 0 ){
      return(
        <MyQuestion navigation={this.props.navigation}/>
      )
    }else{
      return(
        <MyAnswer navigation={this.props.navigation}/>
      )
    }
  }

  renderImageButton() {
    return(
      <TouchableOpacity
        onPress={()=>{
          this.askQuestion();
        }}
        style={styles.imgBtn}>
        <ImageBackground
          style={styles.img}
          source={MyBtTw}>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
}

export default observer(index)

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor:COLOR.bgColor
  },
  tabBarTextStyle: {
    fontSize: 15,
  },
  tabBarUnderlineStyle: {
    backgroundColor: COLOR.normalColor,
    height: 2,
    width: ScreenWidth * (2 / 3) / 4,
    marginLeft: ScreenWidth * (2 / 3) / 8
  },
  scrollableTabView: {
    backgroundColor: '#fff',
  },
  bg:{
    width:ScreenWidth,
    height: ScreenWidth / 1.369,
    alignItems:'center'
  },
  header:{
    width:65,
    height:65,
    marginVertical:15
  },
  title:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor,
  },
  idText:{
    fontSize:FONTSIZE.small,
    color:'#999',
    marginTop:10
  },
  amtItem:{
    flexDirection:'row',
    marginTop:10,
    alignItems:'center'
  },
  amtTitle:{
    fontSize:14,
    color: '#BE8200',
    marginRight:15
  },
  amtImg:{
    width:14,
    height:18,
    marginRight:8
  },
  amtText:{
    fontSize:14,
    color: '#BE8200',
  },
  back:{
    width: 9,
    height:15,
    resizeMode:'contain'
  },
  imgBtn:{
    position:'absolute',
    right: 10,
    bottom: 23,
  },
  img:{
    width:59,
    height:59,
  },
  tabText:{
    fontSize:FONTSIZE.normal
  },
  tabBar:{
    width:ScreenWidth,
    backgroundColor:COLOR.whiteColor,
    justifyContent:'center',
    alignItems:'center'
  }
});