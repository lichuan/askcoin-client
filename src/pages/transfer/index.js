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
  KeyboardAvoidingView
} from 'react-native';
import zzBg from '../../resource/icons/zz_bg.png';

import headerBg from '../../resource/icons/1.png';
import userBg from '../../resource/icons/2.png';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import zzMoneyIcon from '../../resource/icons/zz_money.png';
import zzTxIcon from '../../resource/icons/zz_tx.png';
import zzBtIcon from '../../resource/icons/zz_bt.png';
import zzLine from '../../resource/icons/zz_line.png';
import zzBzIcon from '../../resource/icons/zz_bz.png';
import zzIdIcon from '../../resource/icons/zz_id.png';

import InputBox from '../../components/InputBox';
import NavBar from '../../components/NavBar';
import Button from '../../components/Button';

const IphoneTop = isIphoneX() ? 40 : 20;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:0
    };
  }


  data = [
    {
      date:'2018/03/26',
      time:'21:57',
      avatar:userBg,
      title:'回复打赏',
      status:'+',
      money:60,
      desc:'Sally给你打赏了60ASKCOIN哦'
    },
    {
      date:'2018/03/26',
      time:'21:54',
      avatar:headerBg,
      title:'手续费',
      status:'-',
      money:100,
      desc:'你被扣除了手续费60ASKCOIN哦'
    },
    {
      date:'2018/03/26',
      time:'21:57',
      avatar:userBg,
      title:'回复打赏',
      status:'+',
      money:60,
      desc:'Sally给你打赏了60ASKCOIN哦'
    },
    {
      date:'2018/03/26',
      time:'21:54',
      avatar:headerBg,
      title:'手续费',
      status:'-',
      money:100,
      desc:'你被扣除了手续费60ASKCOIN哦'
    },
    {
      date:'2018/03/26',
      time:'21:57',
      avatar:userBg,
      title:'回复打赏',
      status:'+',
      money:60,
      desc:'Sally给你打赏了60ASKCOIN哦'
    },
    {
      date:'2018/03/26',
      time:'21:54',
      avatar:headerBg,
      title:'手续费',
      status:'-',
      money:100,
      desc:'你被扣除了手续费60ASKCOIN哦'
    }
  ];
  componentWillMount() {

  }

  componentDidMount() {
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
        <View style={styles.container}>
          {this.renderHeader()}
          {
            this.state.selectedIndex === 0
              ? this.renderFirstPage()
              : this.renderSecondPage()
          }
        </View>
      </KeyboardAvoidingView>
    )
  }

  renderHeader(){
    return(
      <ImageBackground
        source={zzBg}
        style={styles.bg}>
        <NavBar
          titleList={['转账','转账记录']}
          onPress={()=>{
            this.props.navigation && this.props.navigation.goBack();
          }}
          onChangeSegment={(index)=>{
            this.setState({
              selectedIndex:index
            });
          }}/>
        <Image
          source={headerBg}
          style={styles.header}/>
        <View style={styles.headerItem}>
          <Text style={styles.nameText}>{'杨欧巴'}</Text>
          <Text style={styles.idText}>{'ID:123456'}</Text>
        </View>
        <View style={styles.headerItem}>
          <Text style={styles.amtTitle}>{'账户余额:'}</Text>
          <View style={styles.amtItem}>
            <Image
              style={styles.amtImg}
              source={zzJbIcon}/>
            <Text style={styles.amtText}>{'200'}</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }

  renderFirstPage() {
    return(
      <View style={styles.firstPage}>
          <View style={styles.content}>
            <InputBox
              source={zzIdIcon}
              editable={true}
              placeholder={'请输入收款人ID'}
              showRightImage={false}/>
            <Image
              source={zzBtIcon}
              style={styles.bt}/>
            <ImageBackground
              style={styles.tx}
              source={zzTxIcon}>
              <Image
                source={userBg}
                style={styles.user}/>
              <View
                style={styles.grayUser}/>
            </ImageBackground>

            <InputBox
              itemStyle={styles.moneyItem}
              source={zzMoneyIcon}
              editable={true}
              placeholder={'请输入您的转账金额'}
              showRightImage={false}/>
            <InputBox
              itemStyle={styles.bzItem}
              source={zzBzIcon}
              editable={true}
              placeholder={'请输入您的备注信息'}
              showRightImage={false}/>
          </View>
          <Button
            title={'发送'}
            btnStyle={styles.bottomBtn}/>
      </View>
    )
  }

  renderSecondPage() {
    return(
      <FlatList
        style={styles.list}
        data={this.data}
        keyExtractor={(item,index)=>index}
        renderItem={({item,index})=>this.renderItem(item,index)}
        ItemSeparatorComponent={()=>this.renderItemSeparator()}/>
    )
  }

  renderItem(item,index){
    return(
      <View style={styles.item}>
        <View style={styles.leftItem}>
          <Text style={styles.date}>
            {item.date}
          </Text>
          <Text style={[styles.date,{marginTop:14}]}>
            {item.time}
          </Text>
        </View>
        <Image
          style={styles.line}
          source={zzLine}/>
        <Image
          style={styles.avatar}
          source={item.avatar}/>

        <View style={styles.rightItem}>
          <View style={styles.titleItem}>
            <Text style={styles.title}>{item.title}</Text>

            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.moneyText}>{item.status}</Text>
              <Image
                source={zzJbIcon}
                style={styles.itemMoney}/>
              <Text style={styles.moneyText}>{item.money}</Text>
            </View>

          </View>
          <Text
            numberOfLines={2}
            style={styles.desc}>
            {item.desc}
          </Text>
        </View>
      </View>
    )
  }

  renderItemSeparator(){
    return(
      <View style={{height:1,backgroundColor:COLOR.bgColor}}/>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor:COLOR.bgColor
  },
  bg:{
    width: ScreenWidth,
    height: ScreenWidth / 1.984,
    alignItems:'center'
  },
  header:{
    width:65,
    height:65,
    borderRadius:32.5,
    marginVertical:15
  },
  nameText:{
    fontSize:FONTSIZE.normal,
    color:'#f5ba1aff',
  },
  idText:{
    marginLeft:15,
    fontSize:FONTSIZE.small,
    color:'#f5ba1aff'
  },
  amtTitle:{
    fontSize:FONTSIZE.small,
    color:'#f5ba1aff'
  },
  amtText:{
    fontSize:FONTSIZE.normal,
    color:'#f5ba1aff',
  },
  headerItem:{
    flexDirection:'row',
    alignItems:'center'
  },
  amtItem:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:15
  },
  amtImg:{
    width:16,
    height:17,
    marginRight:8
  },
  firstPage:{
    flex:1,
    padding:10
  },
  content:{
    backgroundColor:COLOR.whiteColor,
    borderRadius:5,
    paddingVertical:15,
    paddingHorizontal:10,
    alignItems:'center'
  },
  moneyItem:{
    marginTop:17,
  },
  bzItem:{
    marginTop:14
  },
  bt:{
    marginTop:15,
    width:34,
    height:29
  },
  tx:{
    width:298,
    height:75,
    justifyContent:'center'
  },
  user:{
    width:57,
    height:57,
    borderRadius:28.5,
    marginLeft:9
  },

  grayUser:{
    width:57,
    height:57,
    borderRadius:28.5,
    left:9,
    position:'absolute',
    backgroundColor:'#cccc'
  },

  bottomBtn: {
    width:325,
    marginTop:2,
    alignSelf:'center'
  },
  list:{
    flex:1,
    paddingVertical:10,
    backgroundColor:COLOR.bgColor,
    paddingHorizontal:10
  },
  item:{
    flexDirection:'row',
    backgroundColor:COLOR.whiteColor,
    alignItems:'center'
  },
  leftItem:{
    paddingHorizontal:15,
    alignItems:'center',
    justifyContent:'center'
  },
  date:{
    fontSize:FONTSIZE.small,
    color:'#f3bd7c'
  },
  line:{
    width:9,
    height:79,
    resizeMode:'contain',
    marginRight:14
  },
  avatar:{
    width:57,
    height:57,
    resizeMode:'contain'
  },
  rightItem:{
    paddingHorizontal:15,
    flex:1,
    justifyContent:'center'
  },
  titleItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  title:{
    fontSize:FONTSIZE.normal,
    color:'#f1ac08'
  },
  moneyText:{
    fontSize:FONTSIZE.normal,
    color:'#f8d8b6'
  },
  itemMoney:{
    width:16,
    height:17,
    marginHorizontal:8
  },
  desc:{
    fontSize:FONTSIZE.small,
    color:'#555',
    marginTop:8
  },
});