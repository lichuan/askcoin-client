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
  StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';

import zzJbIcon from '../../resource/icons/zz_jb.png';
import { I18n } from '../../language/I18n'


export default class UserHeader extends Component {

  static propTypes = {
    avatarSource: Image.propTypes.source.isRequired,
    name: PropTypes.string,
    id: PropTypes.string,
    amt: PropTypes.number
  };


  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
        <View style={styles.header}>
          <Image
              resizeMode={'contain'}
              style={styles.avatar}
              source={this.props.avatarSource}/>
          <View style={styles.rightItem}>
            <View style={styles.rightTopItem}>
              <Text style={styles.name}>{this.props.name}</Text>
              <Text style={styles.idText}>{`#${this.props.id}`}</Text>
            </View>
            <View style={styles.rightBottomItem}>
              <Text style={styles.amtTitle}>{I18n.t('balance')}</Text>
              <Image
                  resizeMode={'contain'}
                  style={styles.amtImg}
                  source={zzJbIcon}/>
              <Text style={styles.amtText}>{this.props.amt}</Text>
            </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
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
    color: '#999',
    marginLeft: 20
  },
  amtTitle: {
    fontSize: FONTSIZE.small,
    color: COLOR.primaryTextColor,
    marginRight: 15
  },
  amtImg: {
    width: 12,
    height: 15,
    marginRight: 8
  },
  amtText: {
    fontSize: FONTSIZE.small,
    color: COLOR.primaryTextColor,
  },
});