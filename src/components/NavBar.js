/**
 * Created by xiaoming on 2018/3/25.
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
import arrowLeft from '../resource/icons/arrow_left.png';
import PropTypes from 'prop-types';


export default class NavBar extends Component {
  static propTypes = {
    titleList:PropTypes.array.isRequired,
    onChangeSegment:PropTypes.func.isRequired,
    onPress:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex:0
    };
  }

  render() {
    const {titleList,onChangeSegment,navigation, onPress} = this.props;
    return (
      <View style={styles.nav}>
        <TouchableOpacity
          onPress={onPress}
          style={styles.backBtn}>
            <Image
              source={arrowLeft}
              style={styles.back}/>
        </TouchableOpacity>

        <View style={styles.segmentItem}>
          <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedIndex:0
              });
              onChangeSegment && onChangeSegment(0);
            }}>
            <View
              style={[styles.leftSegment,
              this.state.selectedIndex === 0 && {backgroundColor:COLOR.normalColor}]}>
              <Text style={this.state.selectedIndex === 0 ? styles.selectedTitle : styles.normalTitle}>
                {titleList[0]}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedIndex:1
              });
              onChangeSegment && onChangeSegment(1);
            }}>
            <View
              style={[styles.rightSegment,
                this.state.selectedIndex === 1 && {backgroundColor:COLOR.normalColor}]}>
              <Text style={this.state.selectedIndex === 1 ? styles.selectedTitle : styles.normalTitle}>
                {titleList[1]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  nav:{
    width:ScreenWidth,
    height:44,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  back:{
    width:9,
    height:15
  },
  leftSegment:{
    minWidth:105,
    minHeight:28,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:COLOR.secondaryColor,
    borderTopWidth:1,
    borderTopColor:COLOR.secondaryColor,
    borderLeftWidth:1,
    borderLeftColor:COLOR.secondaryColor,
    borderTopLeftRadius:5,
    borderBottomLeftRadius:5,
  },
  rightSegment:{
    minWidth:105,
    minHeight:28,
    justifyContent:'center',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:COLOR.secondaryColor,
    borderTopWidth:1,
    borderTopColor:COLOR.secondaryColor,
    borderRightWidth:1,
    borderRightColor:COLOR.secondaryColor,
    borderTopRightRadius:5,
    borderBottomRightRadius:5,
  },
  normalTitle:{
    fontSize:FONTSIZE.primary,
    color:'#BE8200',
  },
  selectedTitle:{
    fontSize:FONTSIZE.primary,
    color:'#ffff',
  },
  backBtn:{
    height:44,
    paddingHorizontal:15,
    position:'absolute',
    justifyContent:'center',
    top:0,
    left:0
  },
  segmentItem:{
    flexDirection:'row'
  }
});