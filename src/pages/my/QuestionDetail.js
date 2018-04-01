/**
 * Created by xiaoming on 2018/4/1.
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
  FlatList
} from 'react-native';
import MyAvatar from '../../resource/icons/1.png';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import TitleCell from './TitleCell';
import HintCell from '../../components/HintCell';
import itemHeaderBg1 from '../../resource/icons/3.png';
import Slider from '../../components/Slider';
import MyArrowRight from '../../resource/icons/my_arrow_right.png';
import MyNew from '../../resource/icons/my_new.png';
export default class QuestionDetail extends Component {

  data = [
    {
      name:'王玉林',
      money:1,
      value:1,
      question:'为什么共享汽车可以作为现阶段的资本风口呢？对此您有什么看法？',
      isShowSlider:false
    },
    {
      name:'王大林',
      money:2,
      value:15,
      question:'有没有朋友一起去喝酒？',
      isShowSlider:false
    },
    {
      name:'王小林',
      money:3,
      value:20,
      question:'求四川老乡？',
      isShowSlider:false,
      back:[
        {
          name:'小明',
          message:'共享单车代表社会的进步呢！共享单车代表社会的进步呢！共享单车代表社会的进步呢！'
        }
      ]
    }
  ];

  constructor(props) {
    super(props);
    this.state = {
      data:this.data
    };
  }

  componentWillMount() {

  }

  componentDidMount() {

  }



  render() {
    return (
      <View style={STYLE.BACKGROUND}>
        <ScrollView
          style={STYLE.BACKGROUND}>
          {this.renderHeader()}
          <View style={{height:10}}/>
          <TitleCell title="我的问题"/>
          {this.renderAmtView()}
          <View style={{height:10}}/>
          <HintCell hintTitle="用手按住回复内容，可以滑动选择要打赏的金额哦~"/>
          <TitleCell title="全部回复"/>
          {this.renderListView()}
        </ScrollView>
      </View>
    )
  }

  renderHeader(){
    return(
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={MyAvatar}/>
        <View style={styles.rightItem}>
          <View style={styles.rightTopItem}>
            <Text style={styles.name}>{'杨欧巴'}</Text>
            <Text style={styles.idText}>{'#123456'}</Text>
          </View>
          <View style={styles.rightBottomItem}>
            <Text style={styles.amtTitle}>{'账户余额:'}</Text>
            <Image
              style={styles.amtImg}
              source={zzJbIcon}/>
            <Text style={styles.amtText}>{'200'}</Text>
          </View>
        </View>
      </View>
    )
  }

  renderAmtView() {
    return(
      <View style={styles.descView}>
        <View style={styles.topItem}>
        <View style={styles.childItem}>
        <Text style={styles.grayTitle}>{'总打赏金额'}</Text>
          <Text style={[styles.normalTitle,{marginTop:10}]}>{200}</Text>
        </View>
          <View style={styles.line}/>
          <View style={styles.childItem}>
            <Text style={styles.grayTitle}>{'已打赏金额'}</Text>
            <Text style={[styles.normalTitle,{marginTop:10}]}>{150}</Text>
          </View>
          <View style={styles.line}/>
          <View style={styles.childItem}>
            <Text style={styles.grayTitle}>{'剩余打赏金额'}</Text>
            <Text style={[styles.normalTitle,{marginTop:10}]}>{50}</Text>
          </View>
        </View>
        <Text
          style={styles.questText}>
          {'为什么共享单车可以作为现阶段的资本风口呢?对此你有什么看法?'}
        </Text>
      </View>
    )
  }

  renderListView(){
    return (
      <FlatList
        style={styles.list}
        data={this.state.data}
        keyExtractor={(item,index)=>index}
        renderItem={({item,index})=>this.renderItem(item,index)}
        ItemSeparatorComponent={()=>this.renderItemSeparator()}/>
    )
  }

  renderItem(item,index){
    return(
      <View style={styles.item}>
        <Image
          style={styles.itemImg}
          source={itemHeaderBg1}/>
        <View style={styles.itemRight}>
          <View style={styles.itemRightTop}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.moneyText}>{'+'}</Text>
              <Image
                source={zzJbIcon}
                style={styles.itemMoney}/>
              <Text style={styles.moneyText}>{item.money}</Text>
            </View>
          </View>
          {
            item.isShowSlider
              ?
              <Slider
                onValueChange={(val)=>{
                  this.updateValue(index,val);
                }}
                value={item.value}
                style={styles.slide}
                minimumValue={0}
                maximumValue={60}
                minimumTrackTintColor='#1fb28a'
                maximumTrackTintColor='#d3d3d3'
                thumbTintColor='#1a9274'
                debugTouchArea={false}
                thumbStyle={styles.thumbStyle}
                step={1}/>
              : null
          }

          <TouchableOpacity
            onLongPress={()=>this.toggleSlider(index)}>
            <Text
              style={styles.itemRightQuestion}>
              {item.question}
            </Text>
          </TouchableOpacity>

          <View style={styles.itemRightBottom}>
            <TouchableOpacity>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  回复
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft:15}}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>
                  {item.isShowSlider ? '立即打赏' : '我想打赏'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {
            item.back && item.back.length > 0
              ? <View style={styles.messageItem}>
                  <Text
                    style={styles.message}>
                    {item.back[0].name + '：' + item.back[0].message}
                  </Text>
                  <TouchableOpacity
                    onPress={()=>{
                      this.props.navigation && this.props.navigation.navigate('ReplyDetail',{name:'查看回复'});
                    }}
                    style={{marginTop:10}}>
                    <View style={styles.moreMessageItem}>
                      <Text style={styles.messageTitle}>
                        {'共' + item.back.length + '条回复'}
                      </Text>
                      <Image
                        style={styles.arrowRight}
                        source={MyArrowRight}/>
                      <Image
                        style={styles.news}
                        source={MyNew}/>
                    </View>
                  </TouchableOpacity>
                </View>
              : null
          }
        </View>
      </View>
    )
  }

  renderItemSeparator(){
    return(
      <View style={{height:2,backgroundColor:COLOR.diverColor}}/>
    )
  }

  updateValue(index, val) {
    let dataList = this.state.data;
    let list = dataList.map((d,id)=>{
      if(id == index){
        d.value = val;
      }
      return d;
    });
    this.setState({
      data:list
    });
  }

  toggleSlider(index) {
    let dataList = this.state.data;
    let list = dataList.map((d,id)=>{
      if(id == index){
        d.value = 0;
        d.isShowSlider = !d.isShowSlider
      }
      return d;
    });
    this.setState({
      data:list
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header:{
    height:80,
    flexDirection:'row',
    paddingHorizontal:15,
    backgroundColor:COLOR.whiteColor,
    alignItems:'center',
    width:ScreenWidth
  },
  avatar:{
    width:65,
    height:65,
    borderRadius:32.5
  },
  rightItem:{
    marginLeft:15,
    flex:1
  },
  rightTopItem:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  rightBottomItem:{
    flexDirection:'row',
    alignItems:'center',
  },
  name:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor
  },
  idText:{
    fontSize:FONTSIZE.small,
    color:'#999'
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
  topItem:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:10,
  },
  childItem:{
    justifyContent:'center',
    alignItems:'center',
    flex:1
  },
  line:{
    width:1,
    height:44,
    backgroundColor:COLOR.grayColor
  },
  grayTitle:{
    fontSize: FONTSIZE.small,
    color:COLOR.grayTextColor
  },
  normalTitle:{
    fontSize:FONTSIZE.normal,
    color:COLOR.secondaryColor
  },
  descView:{
    paddingVertical:10,
    paddingLeft:25,
    paddingRight:10,
    backgroundColor:COLOR.whiteColor
  },
  questText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor
  },
  list:{
    flex:1,
    backgroundColor:COLOR.bgColor,
  },
  item:{
    flexDirection:'row',
    paddingVertical:10,
    paddingHorizontal:15
  },
  itemImg:{
    width:35,
    height:35,
    borderRadius:17.5
  },
  itemRight:{
    marginLeft:10,
    flex:1
  },
  itemRightTop:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  moneyText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.normalColor
  },
  itemMoney:{
    width:16,
    height:17,
    marginHorizontal:8
  },
  itemRightQuestion:{
    fontSize:FONTSIZE.normal,
    color:COLOR.primaryTextColor,
    marginTop:10
  },
  itemRightBottom:{
    flexDirection:'row',
    alignSelf:'flex-end',
    marginTop:10,
  },
  btn:{
    paddingVertical:5,
    paddingHorizontal:10,
    borderRadius:10,
    backgroundColor:COLOR.primaryColor
  },
  btnText:{
    fontSize:FONTSIZE.small,
    color:COLOR.normalColor
  },
  slider:{
    flex:1,
    height:6,
  },
  thumbStyle:{
    width:65,
    height:16,
  },
  messageItem:{
    padding:15,
  },
  messageTitle:{
    color:'#8aade6',
    fontSize:FONTSIZE.small
  },
  moreMessageItem:{
    flexDirection:'row',
    alignItems:'center',
  },
  arrowRight:{
    width:6,
    height:9,
    resizeMode:'contain',
    marginHorizontal:8
  },
  news:{
    width:14,
    height:10,
    resizeMode:'contain'
  },
  message:{
    fontSize:FONTSIZE.small,
    color:COLOR.normalTextColor
  }
});