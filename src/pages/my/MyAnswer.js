/**
 * Created by xiaoming on 2018/3/30.
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
  ImageBackground
} from 'react-native';
import homeMoneyIcon from '../../resource/icons/home_money.png';
import itemHeaderBg1 from '../../resource/icons/2.png';


export default class MyQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  data = [
    {
      name:'王玉林',
      id:'#25689',
      money:300,
      question:'为什么共享汽车可以作为现阶段的资本风口呢？对此您有什么看法？'
    },
    {
      name:'王大林',
      id:'#123456',
      money:223,
      question:'有没有朋友一起去喝酒？'
    },
    {
      name:'王小林',
      id:'#23333',
      money:233,
      question:'求四川老乡？'
    }
  ];

  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.data}
        keyExtractor={(item,index)=>index}
        renderItem={({item,index})=>this.renderItem(item,index)}
        ItemSeparatorComponent={()=>this.renderItemSeparator()}/>
    )
  }

  toDetail(){
    this.props.navigation && this.props.navigation.navigate('AnswerDetail',{name:'回答详情'})
  }


  renderItem(item,index){
    return(
      <TouchableOpacity
        onPress={()=>{
          this.toDetail()
        }}>
        <View style={styles.item}>
          <View style={styles.itemTop}>
            <Image
              style={styles.itemImg}
              source={itemHeaderBg1}/>
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
        </View>
      </TouchableOpacity>
    )
  }

  renderItemSeparator(){
    return(
      <View style={{height:10,backgroundColor:COLOR.bgColor}}/>
    )
  }
}

const styles = StyleSheet.create({
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
  amtImg:{
    width:16,
    height:17,
    marginRight:8
  },
  amtText:{
    fontSize:FONTSIZE.normal,
    color:'#ffd565ff',
  },
});