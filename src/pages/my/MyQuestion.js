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
import TopicStore from '../../stores/topic';
import homeMoneyIcon from '../../resource/icons/zz_jb.png';
import expiredEN from '../../resource/icons/expired_en.png'
import expiredZH from '../../resource/icons/expired_zh.png'
import {I18n} from '../../language/I18n';
import {Topic, appState, loadReplies, initRouter, topicDetail, toast, handleErrorModal} from '../../net/net'
import {defaultAvatars} from "../../resource/avatars";
import {observer} from 'mobx-react/native';
var Buffer = require('buffer/').Buffer



 class MyQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {

  }

  componentDidMount() {
    initRouter(this)
  }

  render() {
    const {questions} = TopicStore;
    return (
        <FlatList
            style={styles.list}
            data={questions.slice().reverse()}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => this.renderItem(item, index)}
            ItemSeparatorComponent={() => this.renderItemSeparator()}/>
    )
  }


  renderItem(item, index) {
    const {handleSelectTopic} = TopicStore;
    return (
          <View style={styles.item}>
            <TouchableOpacity
                onPress={() => {
                  handleSelectTopic(item);
                  appState.detailType = 0;
                  appState.questionProbe = 0;
                  appState.toDetail = 1;
                  loadReplies();
                  if(appState.blockID - item.block_id > 4320){
                    this.props.navigation && this.props.navigation.navigate('QuestionDetail')
                  }else {
                    topicDetail();
                  }
                }}>
            <View style={styles.itemTop}>
              <Image
                  resizeMode={'contain'}
                  style={styles.itemImg}
                  source={defaultAvatars[item.avatar-1].avatar}/>
              <View style={styles.nameItem}>
                <Text style={styles.name}>
                  {Buffer.from(item.name,'base64').toString()}
                </Text>
                <Text style={styles.itemIdText}>
                  {`#${item.id}`}
                </Text>
              </View>
              <Image
                  resizeMode={'contain'}
                  source={homeMoneyIcon}
                  style={styles.amtImg}/>
              <Text style={styles.amtText}>
                {item.topic_reward}
              </Text>
            </View>
            <Text style={styles.itemQuestion}>
              {Buffer.from(item.topic_data,'base64').toString()}
            </Text>
            {appState.blockID - item.block_id > 4320 ?(
                <Image
                    resizeMode={'contain'}
                    style={{width: ScreenWidth / 4,height:60, position: 'absolute',top:0,bottom:0,right:8}}
                    source={I18n.locale === 'en' ? expiredEN : expiredZH}/>
            ):(
                null
            )}
            </TouchableOpacity>

          </View>
    )
  }

  renderItemSeparator() {
    return (
        <View style={{height: 10, backgroundColor: COLOR.bgColor}}/>
    )
  }
}

export default observer(MyQuestion)

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: COLOR.bgColor,
    paddingHorizontal: 10
  },
  item: {
    backgroundColor: COLOR.whiteColor,
    borderRadius: 5,
    paddingTop: 17,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  itemTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor
  },
  itemImg: {
    width: 35,
    height: 35,
  },
  nameItem: {
    marginLeft: 6,
    marginRight: 14,
    flex: 1
  },
  itemIdText: {
    color: '#acacac',
    fontSize: FONTSIZE.small,
    marginTop: 4
  },
  itemQuestion: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor,
    marginTop: 6,
    lineHeight: 24
  },
  amtImg: {
    width: 14,
    height: 18,
    marginRight: 8
  },
  amtText: {
    fontSize: 14,
    color: '#F0AB51',
  },
});