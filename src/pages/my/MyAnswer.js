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
import {I18n} from '../../language/I18n'
import TopicStore from '../../stores/topic'
import {observer} from 'mobx-react'
import homeMoneyIcon from '../../resource/icons/zz_jb.png';
import expiredEN from '../../resource/icons/expired_en.png'
import expiredZH from '../../resource/icons/expired_zh.png'
import {defaultAvatars} from "../../resource/avatars";
import {loadReplies, appState, compare, initRouter, topicDetail, toast, handleErrorModal} from '../../net/net'

var Buffer = require('buffer/').Buffer

class MyAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {

  }

  loadAnswersCircle = () => {
  };


  componentDidMount() {
    initRouter(this);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer)
  }


  render() {
    const {answers} = TopicStore;
    return (
        <FlatList
            style={styles.list}
            data={answers.slice().sort(compare('block_id'))}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => this.renderItem(item, index)}
            ItemSeparatorComponent={() => this.renderItemSeparator()}/>
    )
  }

  toDetail() {
    this.props.navigation && this.props.navigation.navigate('AnswerDetail')
  }


  renderItem(item, index) {
    const {handleSelectTopic} = TopicStore;
    return (
        <TouchableOpacity
            onPress={() => {
              appState.detailType = 0;
              appState.questionProbe = 0;
              appState.toDetail = 2;
              handleSelectTopic(item);
              loadReplies();
              if (appState.blockID - item.block_id > 4320) {
                this.props.navigation && this.props.navigation.navigate('AnswerDetail')
              }else {
                topicDetail();
              }
            }}>
          <View style={styles.item}>
            <View style={styles.itemTop}>
              <Image
                  resizeMode={'contain'}
                  style={styles.itemImg}
                  source={defaultAvatars[item.avatar - 1].avatar}/>
              <View style={styles.nameItem}>
                <Text style={styles.name}>
                  {Buffer.from(item.name, 'base64').toString()}
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
              {Buffer.from(item.topic_data, 'base64').toString()}
            </Text>
            {appState.blockID - item.block_id > 4320 ? (
                <Image
                    resizeMode={'contain'}
                    style={{width: ScreenWidth / 4, height: 60, position: 'absolute', top: 0,bottom: 0, right: 8}}
                    source={I18n.locale === 'en' ? expiredEN : expiredZH}/>
            ) : (
                null
            )}
          </View>
        </TouchableOpacity>

    )
  }

  renderItemSeparator() {
    return (
        <View style={{height: 10, backgroundColor: COLOR.bgColor}}/>
    )
  }
}

export default observer(MyAnswer)

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
    paddingBottom: 10
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