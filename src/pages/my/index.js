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
  StatusBar,
  Platform,
  ImageBackground
} from 'react-native';
import ScrollableTabView,{DefaultTabBar}from 'react-native-scrollable-tab-view';
import MyAnswer from './MyAnswer';
import MyQuestion from './MyQuestion';

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
      StatusBar.setHidden(false);
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollableTabView
          /*renderTabBar={() =>
            <DefaultTabBar
              style={styles.tabStyle}
              tabs={['我的提问','我的回答']}
              inactiveTextColor="#9a9a99"
              activeTextColor="#fbb422"
              textStyle={FONTSIZE.normal}
              underlineStyle={styles.tabBarUnderlineStyle}/>
          }*/
          tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
          tabBarTextStyle={styles.tabBarTextStyle}
          tabBarInactiveTextColor={'#9a9a99'}
          tabBarActiveTextColor={'#fbb422'}
          locked={true}>

          <MyQuestion tabLabel="我的提问" navigation={this.props.navigation}/>
          <MyAnswer tabLabel="我的回答" navigation={this.props.navigation}/>

        </ScrollableTabView>
      </View>
    )
  }

  renderHeader(){
    return(
      <ImageBackground
        source={bg}
        style={styles.bg}>
        <Text
          style={styles.title}>
          {'ASKCOIN'}
        </Text>
        <View style={styles.info}>
          <Image
            source={headerBg}
            style={styles.header}/>
          <View style={styles.headerRight}>
            <View style={styles.headerRightItem}>
              <Text style={styles.title}>
                {'杨欧巴'}
              </Text>
              <Text style={styles.idText}>
                {'#1234569'}
              </Text>
            </View>
            <View style={[styles.headerRightItem,{marginTop:16}]}>
              <Text style={styles.amtTitle}>
                {'账户余额:'}
              </Text>
              <View style={styles.amtItem}>
                <Image
                  style={styles.amtImg}
                  source={homeMoneyIcon}/>
                <Text style={styles.amtText}>
                  {200}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:Platform.OS === 'ios' ? IphoneTop : 0,
    backgroundColor:COLOR.bgColor
  },
  tabBarTextStyle: {
    fontSize: 15,
  },
  tabBarUnderlineStyle: {
    backgroundColor: COLOR.normalColor,
    height: 2,
  },
  scrollableTabView: {
    backgroundColor: '#fff',
  }
});