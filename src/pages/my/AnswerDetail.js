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
import UserStore from '../../stores/user'
import {I18n} from '../../language/I18n'
import TopicStore from '../../stores/topic'
import zzJbIcon from '../../resource/icons/zz_jb.png';
import TitleCell from './TitleCell';
import QuestionItem from "../../components/questionItem";
import {appState, stopDetailProbe} from "../../net/net";
import {defaultAvatars} from "../../resource/avatars";
import {observer} from 'mobx-react'

class AnswerDetail extends Component {

  contentHeight = 0;

  constructor(props) {
    super(props);
    this.state = {
      data: this.data,
      listHeight:0
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    appState.toDetail = false;
    appState.detailType = 0;
    appState.questionProbe = 0;
  }

  componentWillUnmount() {
    stopDetailProbe();
  }

  reply = () => {
    appState.replyMode = 1;
    this.props.navigation && this.props.navigation.navigate('Reply');
  };

  replyAll = () => {
    appState.replyMode = 1;
    this.props.navigation && this.props.navigation.navigate('ReplyAll');
  };

  loadAwardForItem = (item) => {
    let award = 0;
    TopicStore.replies.slice().filter((subItem) => {
      return subItem.type === 1 && subItem.reply_to === item.reply_key
    }).forEach((subItem) => {
      award += subItem.balance
    })
    return award;
  };


  render() {
    return (
        <View>
          <FlatList
              inverted={true}
              ListFooterComponent={(
                    <View>
                      {this.renderHeader()}
                      <View style={{height: 10}}/>
                      <TitleCell title={I18n.t('questionToAnswer')}/>
                      {this.renderAmtView()}
                      <View style={{height: 10}}/>
                      <TitleCell title={I18n.t('allReplies')}/>
                    </View>
                )
              }
              style={styles.list}
              data={TopicStore.replies.slice().filter((item) => {
                return item.type === 0
              }).reverse()}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => this.renderItem(item, index)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}/>
          <View style={{flex:1}}/>
        </View>
    )
  }

  renderHeader() {
    return (
        <View style={styles.header}>
          <Image
              resizeMode={'contain'}
              style={styles.avatar}
              source={defaultAvatars[TopicStore.selectTopic.avatar - 1].avatar}/>
          <View style={styles.rightItem}>
            <View style={styles.rightTopItem}>
              <Text style={styles.name}>{Buffer.from(TopicStore.selectTopic.name, 'base64').toString()}</Text>
            </View>
            <View style={styles.rightBottomItem}>
              <Text style={styles.idText}>{`#${TopicStore.selectTopic.id}`}</Text>
            </View>
          </View>
        </View>
    )
  }

  loadAward = (pass) => {
    let awarded = 0;
    TopicStore.replies.filter((item) => {
      return item.type === 1
    }).forEach((item) => {
      awarded += item.balance;
    });

    if (pass) {
      return awarded
    } else {
      return TopicStore.selectTopic.topic_reward - awarded
    }
  };


  renderAmtView() {
    return (
        <View style={styles.descView}>
          <View style={styles.topItem}>
            <View style={styles.childItem}>
              <Text style={styles.grayTitle}>{I18n.t('totalReward')}</Text>
              <Text style={[styles.normalTitle, {marginTop: 10}]}>{TopicStore.selectTopic.topic_reward}</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.childItem}>
              <Text style={styles.grayTitle}>{I18n.t('amountAwarded')}</Text>
              <Text style={[styles.normalTitle, {marginTop: 10}]}>{this.loadAward(true)}</Text>
            </View>
            <View style={styles.line}/>
            <View style={styles.childItem}>
              <Text style={styles.grayTitle}>{I18n.t('remainingReward')}</Text>
              <Text style={[styles.normalTitle, {marginTop: 10}]}>{this.loadAward(false)}</Text>
            </View>
          </View>
          <Text selectable={true}
                style={styles.questText}>
            {Buffer.from(TopicStore.selectTopic.topic_data, 'base64').toString()}
          </Text>
        </View>
    )
  }


  renderItem(item, index) {
    return (
        <View>
          <QuestionItem>
            <QuestionItem.InfoView>
              <QuestionItem.Avatar
                  resizeMode={'contain'}
                  source={defaultAvatars[item.avatar - 1].avatar}/>
              <View style={{justifyContent: 'space-between', marginLeft: 12}}>
                <QuestionItem.Nickname>{Buffer.from(item.name, 'base64').toString()}</QuestionItem.Nickname>
                <QuestionItem.ID>{`#${item.id}`}</QuestionItem.ID>
              </View>
              <QuestionItem.Amount>
                <QuestionItem.Money>{'+'}</QuestionItem.Money>
                <QuestionItem.MoneyIcon
                    resizeMode={'contain'}
                    source={zzJbIcon}/>
                <QuestionItem.Money>{this.loadAwardForItem(item)}</QuestionItem.Money>
              </QuestionItem.Amount>
            </QuestionItem.InfoView>
            <QuestionItem.Content selectable={true} space>
              <QuestionItem.Content selectable={true} reply space>
                {item.reply_to ? `@${Buffer.from(TopicStore.replies.find((subItem) => {
                  return subItem.reply_key === item.reply_to
                }).name, 'base64')}, ` : ''}
              </QuestionItem.Content>
              {Buffer.from(item.reply_data, 'base64').toString()}
            </QuestionItem.Content>
            {item.id === UserStore.id ? (null) : (
                <View style={styles.itemRightBottom}>
                  <TouchableOpacity onPress={() => {
                    TopicStore.handleSelectReply(item);
                    appState.replyMode = 1;
                    this.props.navigation && this.props.navigation.navigate('Reply');
                  }}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>{I18n.t('reply')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginLeft: 8}} onPress={() => {
                    TopicStore.handleSelectReply(item);
                    appState.replyMode = 2;
                    this.props.navigation && this.props.navigation.navigate('Reply');
                  }}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>{I18n.t('replyToAll')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
            )}
          </QuestionItem>
        </View>
    )
  }

  renderItemSeparator() {
    return (
        <View style={{height: 1, backgroundColor: COLOR.diverColor}}/>
    )
  }
}

export default observer(AnswerDetail)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 15,
    backgroundColor: COLOR.whiteColor,
    alignItems: 'center',
    width: ScreenWidth
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5
  },
  rightItem: {
    marginLeft: 8,
    flex: 1
  },
  rightTopItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBottomItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor
  },
  idText: {
    fontSize: FONTSIZE.small,
    color: '#999'
  },
  amtTitle: {
    fontSize: FONTSIZE.small,
    color: COLOR.primaryTextColor,
    marginRight: 15
  },
  amtImg: {
    width: 16,
    height: 17,
    marginRight: 8
  },
  amtText: {
    fontSize: FONTSIZE.primary,
    color: COLOR.primaryTextColor,
  },
  topItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  childItem: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  line: {
    width: 1,
    height: 44,
    backgroundColor: COLOR.grayColor
  },
  grayTitle: {
    fontSize: FONTSIZE.small,
    color: '#333333'
  },
  normalTitle: {
    fontSize: FONTSIZE.normal,
    color: COLOR.secondaryColor
  },
  descView: {
    paddingVertical: 10,
    paddingLeft: 25,
    paddingRight: 10,
    backgroundColor: COLOR.whiteColor
  },
  questText: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor,
    lineHeight: 24
  },
  list: {

  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  itemImg: {
    width: 35,
    height: 35,
    borderRadius: 17.5
  },
  itemRight: {
    marginLeft: 10,
    flex: 1
  },
  itemRightTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  moneyText: {
    fontSize: FONTSIZE.normal,
    color: COLOR.normalColor
  },
  itemMoney: {
    width: 16,
    height: 17,
    marginHorizontal: 8
  },
  itemRightQuestion: {
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor,
    marginTop: 10
  },
  itemRightBottom: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: COLOR.primaryColor
  },
  btnText: {
    fontSize: FONTSIZE.small,
    color: '#BE8200'
  },
  slider: {
    flex: 1,
    height: 6,
  },
  thumbStyle: {
    width: 65,
    height: 16,
  },
  messageItem: {
    padding: 15,
  },
  messageTitle: {
    color: '#8aade6',
    fontSize: FONTSIZE.small
  },
  moreMessageItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowRight: {
    width: 6,
    height: 9,
    resizeMode: 'contain',
    marginHorizontal: 8
  },
  news: {
    width: 14,
    height: 10,
    resizeMode: 'contain'
  },
  message: {
    fontSize: FONTSIZE.small,
    color: COLOR.normalTextColor
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});