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
  ScrollView,
  Platform
} from 'react-native';
import {I18n} from '../../language/I18n'
import {observer} from 'mobx-react/native'
import TopicStore from '../../stores/topic'
import UserStore from '../../stores/user'

var Buffer = require('buffer/').Buffer


import bg from '../../resource/icons/bg.png';
import homeMoneyIcon from '../../resource/icons/zz_jb.png';
import homeYmIcon from '../../resource/icons/home_ym.png';
import homeBtEN from '../../resource/icons/home_bt.png';
import homeBtCH from '../../resource/icons/home_bt_73.png';
import {appState, initRouter,compare} from '../../net/net'
import {defaultAvatars} from '../../resource/avatars'



const IphoneTop = isIphoneX() ? 40 : 20;

 class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {

  }

  componentDidMount() {
    initRouter(this)
    /*this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(true);
    });*/
  }

  componentWillUnmount() {
    //this._navListener.remove();
  }

  render() {
    return (
        <ScrollView
            stickyHeaderIndices={[1]}
            style={styles.container}>
          {this.renderHeader()}
          {this.renderHeaderItem()}
          {this.renderListView()}
        </ScrollView>
    )
  }


  renderHeader() {
    return (
        <ImageBackground
            source={bg}
            style={styles.bg}>
          <Text
              style={styles.title}>
            {'ASKCOIN'}
          </Text>
          <View style={styles.info}>
            <Image
                resizeMode={'contain'}
                source={defaultAvatars[UserStore.avatar-1].avatar}
                style={styles.header}/>
            <View style={styles.headerRight}>
              <View style={styles.headerRightItem}>
                <Text style={styles.title}>{Buffer.from(UserStore.name,'base64').toString()}</Text>
              </View>
              <View style={styles.headerRightItem}>
                <Text style={styles.amtTitle}>{I18n.t('balance')}</Text>
                <View style={styles.amtItem}>
                  <Image
                      resizeMode={'contain'}
                      style={styles.amtImg}
                      source={homeMoneyIcon}/>
                  <Text style={styles.amtText}>{UserStore.balance}</Text>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
    )
  }

  renderHeaderItem() {
    return (
        <View>
          <View style={styles.headerItem}>
            <Image
                resizeMode={'contain'}
                style={styles.ymIcon}
                source={homeYmIcon}/>
            <Text style={styles.headerItemTitle}>{I18n.t('latestQuestions')}</Text>
          </View>
        </View>
    )
  }

  renderListView() {
    return (
        <FlatList
            extraData={appState.blockID}
            style={styles.list}
            data={TopicStore.topics.slice().sort(compare('block_id'))}
            keyExtractor={(item, index) => index}
            renderItem={({item, index}) => this.renderItem(item, index)}
            ItemSeparatorComponent={() => this.renderItemSeparator()}/>
    )
  }


  renderItem(item, index) {
    return (
        <View>
        {appState.blockID - item.block_id >= 4320?(null):(
            <View style={styles.item}>
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
              <TouchableOpacity
                  onPress={()=>{
                    TopicStore.handleSelectTopic(item)
                    appState.replyMode = 0;
                    this.props.navigation && this.props.navigation.navigate('Reply', {name: '抢答回复'});
                  }}
                  style={styles.itemBtn}>
                <Image
                    style={styles.itemBtnImg}
                    source={I18n.locale === 'en' ? homeBtEN : homeBtCH}/>
              </TouchableOpacity>
            </View>
        )}
        </View>
    )
  }

  renderItemSeparator() {
    return (
        <View style={{height: 10, backgroundColor: COLOR.bgColor}}/>
    )
  }

}

export default observer(index)

const styles = StyleSheet.create({
  bg: {
    width: ScreenWidth,
    height: ScreenWidth / 2.06,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: FONTSIZE.primary,
    color: '#ffff',
  },
  info: {
    marginTop: 35,
    alignItems: 'center',
    flexDirection: 'row'
  },
  header: {
    width: 65,
    height: 65,
  },
  headerRight: {
    height: 40,
    marginLeft: 8,
    justifyContent: 'space-between'
  },
  headerRightItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  idText: {
    marginLeft: 15,
    fontSize: FONTSIZE.small,
    color: '#ffff'
  },
  amtTitle: {
    fontSize: FONTSIZE.small,
    color: '#ffff'
  },
  amtText: {
    fontSize: 14,
    color: '#F0AB51',
  },
  amtItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 14
  },
  amtImg: {
    width: 14,
    height: 18,
    marginRight: 8
  },
  headerItem: {
    flexDirection: 'row',
    backgroundColor: COLOR.whiteColor,
    height: ScreenHeight / 11,
    alignItems: 'center'
  },
  ymIcon: {
    height: '80%',
    marginRight: 15,
    marginLeft: 15,
    borderBottomColor: '#FFD565',
    borderBottomWidth: 1,
  },
  headerItemTitle: {
    fontSize: FONTSIZE.normal,
    color: '#ffd565'
  },
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
    marginTop: 4,
    fontSize: FONTSIZE.normal,
    color: COLOR.primaryTextColor
  },
  itemImg: {
    width: 35,
    height: 35,
  },
  nameItem: {
    marginLeft: 10,
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
    marginTop: 0,
    lineHeight: 24,
  },
  itemBtn: {
    alignSelf: 'flex-end',
    marginTop: 8
  },
  itemBtnImg: {
    width: 73,
    height: 26
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor: COLOR.bgColor
  }
});