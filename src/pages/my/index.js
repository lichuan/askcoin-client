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
import ScrollableTabView,{DefaultTabBar}from 'react-native-scrollable-tab-view';
import MyAnswer from './MyAnswer';
import MyQuestion from './MyQuestion';

import myBg from '../../resource/icons/my_bg.png';
import headerBg from '../../resource/icons/1.png';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import HeaderView from '../../components/HeaderView';
import arrowLeft from '../../resource/icons/arrow_left.png';
import NavButton from '../../components/NavButton';
import MyBtTw from '../../resource/icons/my_bt_tw.png'
import SwipeTopBar from '../../components/SwipeTopBar';

const IphoneTop = isIphoneX() ? 40 : 20;


export default class index extends Component {
  tabs = ['我的提问','我的回答'];
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
    this.props.navigation && this.props.navigation.navigate('AskQuestion',{name:'发起提问'});
  }

  renderHeader(){
    return(
      <ImageBackground
        source={myBg}
        style={styles.bg}>
        <HeaderView
          headerTitle="我的"
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
          source={headerBg}
          style={styles.header}/>
        <Text style={styles.title}>
          {'杨欧巴'}
        </Text>
        <Text style={styles.idText}>
          {'#123456'}
        </Text>
        <View style={styles.amtItem}>
          <Text style={styles.amtTitle}>{'账户余额:'}</Text>
          <Image
            style={styles.amtImg}
            source={zzJbIcon}/>
          <Text style={styles.amtText}>{'200'}</Text>
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
    borderRadius:32.5,
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
    fontSize:FONTSIZE.small,
    color:COLOR.primaryTextColor,
    marginRight:15
  },
  amtImg:{
    width:16,
    height:17,
    marginRight:8
  },
  amtText:{
    fontSize:FONTSIZE.primary,
    color:COLOR.primaryTextColor,
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