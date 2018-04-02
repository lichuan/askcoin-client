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
  FlatList,
  ImageBackground,
  StatusBar,
  Platform
} from 'react-native';
import bg from '../../resource/icons/bg.png';
import headerBg from '../../resource/icons/1.png';
import homeMoneyIcon from '../../resource/icons/home_money.png';
import homeYmIcon from '../../resource/icons/home_ym.png';
import homeBt from '../../resource/icons/home_bt.png';
import itemHeaderBg1 from '../../resource/icons/2.png';
import itemHeaderBg2 from '../../resource/icons/3.png';
import itemHeaderBg3 from '../../resource/icons/4.png';

const IphoneTop = isIphoneX() ? 40 : 20;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  data = [
    {
      img:itemHeaderBg1,
      name:'王玉林',
      id:'#25689',
      money:300,
      question:'为什么共享汽车可以作为现阶段的资本风口呢？对此您有什么看法？'
    },
    {
      img:itemHeaderBg2,
      name:'王大林',
      id:'#123456',
      money:223,
      question:'有没有朋友一起去喝酒？'
    },
    {
      img:itemHeaderBg3,
      name:'王小林',
      id:'#23333',
      money:233,
      question:'求四川老乡？'
    }
  ];

  componentWillMount() {

  }

  componentDidMount() {
    /*this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true);
    });*/
  }

  componentWillUnmount() {
    //this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderHeaderItem()}
        {this.renderListView()}
      </View>
    )
  }


  renderHeader(){
    return(
      <ImageBackground
        source={bg}
        style={styles.bg}>
        <Text
          style={styles.title}>
          {'ASKCOIN'}
        </Text>
        <View style={styles.info}>
          <Image
            source={headerBg}
            style={styles.header}/>
          <View style={styles.headerRight}>
            <View style={styles.headerRightItem}>
              <Text style={styles.title}>
                {'杨欧巴'}
              </Text>
              <Text style={styles.idText}>
                {'#1234569'}
              </Text>
            </View>
            <View style={[styles.headerRightItem,{marginTop:16}]}>
              <Text style={styles.amtTitle}>
                {'账户余额:'}
              </Text>
              <View style={styles.amtItem}>
                <Image
                  style={styles.amtImg}
                  source={homeMoneyIcon}/>
                <Text style={styles.amtText}>
                  {200}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }

  renderHeaderItem() {
    return(
      <View style={styles.headerItem}>
        <Image
          style={styles.ymIcon}
          source={homeYmIcon}/>
        <Text style={styles.headerItemTitle}>
          {'限时抢答'}
        </Text>
      </View>
    )
  }

  renderListView() {
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
        <View style={styles.itemTop}>
          <Image
            style={styles.itemImg}
            source={item.img}/>
          <View style={styles.nameItem}>
            <Text style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.itemIdText}>
              {item.id}
            </Text>
          </View>
          <Image
            source={homeMoneyIcon}
            style={styles.amtImg}/>
          <Text style={styles.amtText}>
            {item.money}
          </Text>
        </View>
        <Text style={styles.itemQuestion}>
          {item.question}
        </Text>
        <TouchableOpacity
          style={styles.itemBtn}>
          <Image
            style={styles.itemBtnImg}
            source={homeBt}/>
        </TouchableOpacity>
      </View>
    )
  }

  renderItemSeparator(){
    return(
      <View style={{height:10,backgroundColor:COLOR.bgColor}}/>
    )
  }

}

const styles = StyleSheet.create({
  bg:{
    width: ScreenWidth,
    height: ScreenWidth / 2.06,
    alignItems:'center',
    justifyContent:'center'
  },
  title:{
    fontSize:FONTSIZE.primary,
    color:'#ffff',
  },
  info:{
    marginTop:35,
    alignItems:'center',
    flexDirection:'row'
  },
  header:{
    width:65,
    height:65,
    borderRadius:32.5
  },
  headerRight:{
    marginLeft:20
  },
  headerRightItem:{
    flexDirection:'row',
    alignItems:'center'
  },
  idText:{
    marginLeft:15,
    fontSize:FONTSIZE.small,
    color:'#ffff'
  },
  amtTitle:{
    fontSize:FONTSIZE.normal,
    color:'#ffff'
  },
  amtText:{
    fontSize:FONTSIZE.normal,
    color:'#ffd565ff',
  },
  amtItem:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:14
  },
  amtImg:{
    width:16,
    height:17,
    marginRight:8
  },
  headerItem:{
    flexDirection:'row',
    backgroundColor:COLOR.whiteColor,
    height:54,
    alignItems:'center'
  },
  ymIcon:{
    width:27,
    height:27,
    marginRight:18,
    marginLeft:15
  },
  headerItemTitle:{
    fontSize:FONTSIZE.normal,
    color:'#ffd565'
  },
  list:{
    flex:1,
    paddingVertical:10,
    backgroundColor:COLOR.bgColor,
    paddingHorizontal:10
  },
  item:{
    backgroundColor:COLOR.whiteColor,
    borderRadius:5,
    paddingTop:17,
    paddingHorizontal:10,
    paddingBottom:10
  },
  itemTop:{
    flexDirection:'row',
    alignItems:'center',
  },
  name:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor
  },
  itemImg:{
    width:35,
    height:35,
    borderRadius:17.5
  },
  nameItem:{
    marginLeft:14,
    marginRight:14,
    flex:1
  },
  itemIdText:{
    color:'#acacac',
    fontSize:FONTSIZE.small,
    marginTop:10
  },
  itemQuestion:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor,
    marginTop:13
  },
  itemBtn:{
    alignSelf:'flex-end',
    marginTop:8
  },
  itemBtnImg:{
    width:73,
    height:26
  },
  container:{
    flex:1,
    paddingTop:Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor:COLOR.bgColor
  }
});