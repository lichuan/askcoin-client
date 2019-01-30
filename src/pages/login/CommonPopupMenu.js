/**
 * Created by xiaoming on 2018/4/11.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  BackHandler
} from 'react-native';
import loginChoose from '../../resource/icons/login_choose.png';
import PropTypes from 'prop-types';

export default class CommonPopupMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible:false
    }
  }

  static propTypes = {
    list:PropTypes.array.isRequired,
    selectedIndex:PropTypes.number.isRequired,
    menuStyle:PropTypes.object,
    onItemSelected:PropTypes.func
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    if (this.state.visible) {
      this.close();
      return true;
    } else {
      return false;
    }
  };

  open(){
    this.setState({
      visible:true
    })
  }

  close(){
    this.setState({
      visible:false
    })
  }

  render() {
    if(!this.state.visible){
      return null;
    }
    const {list,selectedIndex,menuStyle,onItemSelected} = this.props;

    let menuItems = list.map((name,index)=>{
      return(
        <TouchableOpacity
          style={styles.pickerItem}
          key={index}
          onPress={()=>{
            this.close();
            onItemSelected && onItemSelected(index)
          }}>
          <Text style={styles.pickerText}>
            {name}
          </Text>
          {
            selectedIndex === index
              ? <Image
                  style={styles.choose}
                  source={loginChoose}/>
              : null
          }
        </TouchableOpacity>
      )
    });

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={()=>{
            this.close();
          }}
          style={{flex:1}}>
          <View style={{flex:1}}/>
        </TouchableWithoutFeedback>
        <View style={[styles.dropMenu,menuStyle]}>
          {menuItems}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor: '#0000'
  },
  dropMenu:{
    position:'absolute',
    backgroundColor:COLOR.whiteColor
  },
  pickerItem:{
    borderColor:COLOR.borderColor,
    backgroundColor:'#fffbdf',
    width: 325,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:15,
    justifyContent:'space-between',
    alignSelf:'center',
    borderRadius:5,
    borderWidth:1,
    borderTopWidth:0
  },
  pickerText:{
    fontSize:FONTSIZE.normal,
    color:COLOR.normalTextColor
  },
  choose:{
    width:19,
    height:15
  },
});