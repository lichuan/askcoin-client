import React, {Component} from 'react';
import {
  TouchableOpacity,
  FlatList, View
} from 'react-native';
import Top100Item from '../../components/top100Item';
import zzJbIcon from '../../resource/icons/zz_jb.png';
import {defaultAvatars} from "../../resource/avatars";

import {Top100List} from '../../net/net'
var Buffer = require('buffer/').Buffer;


class Top100 extends Component {
  constructor(props) {
    super(props)

  }


  renderItem(item, index) {
    return (
        <Top100Item>
          <Top100Item.Num>{index+1}</Top100Item.Num>
          <Top100Item.Avatar
              resizeMode={'contain'}
              source={defaultAvatars[item.avatar-1].avatar}/>
          <Top100Item.InfoView>
            <Top100Item.Nickname numberOfLines={1}>{Buffer.from(item.name, 'base64').toString()}</Top100Item.Nickname>
            <Top100Item.ID>{`#${item.id}`}</Top100Item.ID>
          </Top100Item.InfoView>
          <Top100Item.AccountView>
            <Top100Item.MoneyIcon
                resizeMode={'contain'}
                source={zzJbIcon}/>
            <Top100Item.Account>{item.balance}</Top100Item.Account>
          </Top100Item.AccountView>
        </Top100Item>
    )
  };

  renderItemSeparator() {
    return (
        <View style={{height: 1, backgroundColor: COLOR.diverColor}}/>
    )
  }

  render() {
    return (
        <View style={{backgroundColor:'#f2f2f2'}}>
          <FlatList
              data={Top100List.top100}
              keyExtractor={(item, index) => index}
              renderItem={({item, index}) => this.renderItem(item, index)}
              ItemSeparatorComponent={() => this.renderItemSeparator()}/>
          <View style={{flex:1}}/>
        </View>
    )
  }
}

export default Top100;