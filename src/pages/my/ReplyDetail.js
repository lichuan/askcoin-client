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
  FlatList
} from 'react-native';
import itemHeaderBg1 from '../../resource/icons/3.png';
import Slider from '../../components/Slider';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import itemHeaderBg2 from '../../resource/icons/4.png';

export default class ReplyDetail extends Component {
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
          name:'杨欧巴',
          message:'共享单车代表社会的进步呢！共享单车代表社会的进步呢！共享单车代表社会的进步呢！',
          isShowSlider:false,
          isLandlord:true,
          money:3,
          value:0
        },
        {
          name:'小明',
          message:'是的，这是社会发展的新趋势',
          isShowSlider:true,
          isLandlord:false,
          to:'杨欧巴',
          money:3,
          value:0
        },
        {
          name:'小王',
          message:'是的，这是社会发展的新趋势的新的趋势',
          isShowSlider:false,
          isOnWer:false,
          isLandlord:false,
          to:'杨欧巴',
          money:2,
          value:0
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
                thumbTouchSize={{width:180,height:40}}
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
              ? this.renderChildItem(item.back,index)
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

  renderChildItem(backList,index){
    return backList.map((item,id)=>{
      return(
        <View style={styles.messageItem}
              key={index+''+id}>
          <View style={styles.itemRightTop}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Image
                style={[styles.itemImg,{marginRight:8}]}
                source={itemHeaderBg2}/>
              {
                item.isLandlord
                  ? <Text style={styles.name}>{item.name}</Text>
                  : <View style={styles.toItem}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.to}>{'to'}</Text>
                      <Text style={styles.name}>{item.to}</Text>
                    </View>
              }
            </View>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <Text style={styles.moneyText}>{'+'}</Text>
              <Image
                source={zzJbIcon}
                style={styles.itemMoney}/>
              <Text style={styles.moneyText}>{item.money}</Text>
            </View>
          </View>

          {
            item.isLandlord
              ? null
              : item.isShowSlider
                ?
                <Slider
                  onValueChange={(val)=>{
                    this.updateChildValue(index,id,val);
                  }}
                  value={item.value}
                  style={styles.slide}
                  minimumValue={0}
                  maximumValue={60}
                  thumbTouchSize={{width:180,height:40}}
                  minimumTrackTintColor='#1fb28a'
                  maximumTrackTintColor='#d3d3d3'
                  thumbTintColor='#1a9274'
                  debugTouchArea={false}
                  thumbStyle={styles.thumbStyle}
                  step={1}/>
                : null
          }

          <TouchableOpacity
            disabled={item.isLandlord}
            onLongPress={()=>this.toggleChildSlider(index,id)}>
            <Text
              style={styles.itemRightQuestion}>
              {item.message}
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
            {
              item.isLandlord
                ? null
                : <TouchableOpacity
                  style={{marginLeft:15}}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>
                        {item.isShowSlider ? '立即打赏' : '我想打赏'}
                      </Text>
                    </View>
                  </TouchableOpacity>
            }
          </View>
        </View>
      );
    })
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

  updateChildValue(index, id, val) {
    let list = this.state.data;
    let childList = list[index].back;
    let newChildList = childList.map((d,i)=>{
      if(id == i){
        d.value = val;
      }
      return d;
    });
    list[index].back = newChildList;
    this.setState({
      data:list
    })
  }

  toggleChildSlider(index, i) {
    let list = this.state.data;
    let childList = list[index].back;
    let newChildList = childList.map((d,id)=>{
      if(id == i){
        d.value = 0;
        d.isShowSlider = !d.isShowSlider
      }
      return d;
    });
    list[index].back = newChildList;
    this.setState({
      data:list
    })
  }


}

const styles = StyleSheet.create({
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
    paddingLeft:15,
    paddingVertical:10
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
  },
  to:{
    marginHorizontal:5,
    fontSize:FONTSIZE.small,
    color:'#5CD5B6'
  },
  toItem:{
    flexDirection:'row',
    alignItems:'center'
  }
});