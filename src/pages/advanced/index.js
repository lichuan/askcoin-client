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
  ScrollView,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';
import UnOpenedItem from '../../components/UnOpenedItem';
import RowItem from '../../components/RowItem';

const IphoneTop = isIphoneX() ? 40 : 20;

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {

  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setHidden(false,false);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  toApiSwitch(){
    this.props.navigation && this.props.navigation.navigate('ApiSwitch',{name:'API选择'})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={STYLE.BACKGROUND}>
          <RowItem
            name="语言"
            desc={'汉语'}/>
          <RowItem
            onPress={()=>{
              this.toApiSwitch()
            }}
            name="API选择"
            desc={'节点服务器1'}/>
          <UnOpenedItem
            name="排行榜"/>
          <UnOpenedItem
            name="投票"/>
          <UnOpenedItem
            name="监控"/>
          <UnOpenedItem
            name="参数"/>
          <UnOpenedItem
            name="关于"/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor:COLOR.bgColor
  }
});