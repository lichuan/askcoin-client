/**
 * Created by xiaoming on 2018/2/1.
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ToastAndroid
} from 'react-native';
import PropTypes from 'prop-types';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import ApiIcon from '../../resource/icons/api.png';
import ip_img from '../../resource/icons/ip.png';
import {I18n} from "../../language/I18n";
import {toast} from '../../net/net'



const leftValue = (ScreenWidth - 285 - 40) / 2;
export default class ApiPopup extends Component {
  static propTypes = {
    onRequestClose:PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      address:'',
      name:''
    }
  }



  open(){
    this.setState({
      visible:true,
      value:''
    });
  }

  close() {
    this.setState({
      visible: false,
      name: '',
      address:''
    });
    this.props.onRequestClose && this.props.onRequestClose();
  }


  onCommit=()=>{
    const name = this.state.name.trim();
    const address = this.state.address.trim();
    if(name === ''){
      toast(I18n.t('inputAPINodeName'));
      return
    }
    if(address === ''){
      toast(I18n.t('InputAPINodeAddress'));
      return
    }
    if(address.indexOf('ws://') !== 0){
      toast(I18n.t('apiStartWithws'));
      return
    }

    if(address.indexOf(' ') !== -1){
      toast(I18n.t('apiNoSpace'));
      return
    }

      this.setState({visible:false});
      this.props.onAdd && this.props.onAdd(name, address)
  };


  render() {
    return (
      <Modal
        transparent={true}
        {...this.props}
        visible={this.state.visible}
        onRequestClose={() => {
          if (this.state.visible) {
            this.close();
          }
        }}>
        <View style={{flex: 1, backgroundColor: '#0009'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={{flex:1}}
            onPress={()=>this.close()}>
            <View style={{flex:1}}/>
          </TouchableOpacity>
          <View style={styles.alert}>
            <InputBox
              onChangeText={(v)=>{
                this.setState({name:v})
              }}
              value={this.state.name}
              placeholder={I18n.t('inputAPINodeName')}
              source={ApiIcon}
              itemStyle={styles.input}
              showRightImage={false}/>
            <InputBox
                onChangeText={(v)=>{
                  v = v.replace(/：/g,":")
                  this.setState({address:v})
                }}
                value={this.state.address}
                placeholder={I18n.t('InputAPINodeAddress')}
                source={ip_img}
                itemStyle={[styles.input,{marginTop:20}]}
                showRightImage={false}/>
            <Button
              onPress={
                this.onCommit
              }
              btnStyle={styles.btn}
              title={'确定'}/>
          </View>
        </View>

      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  alert:{
    backgroundColor:COLOR.whiteColor,
    paddingVertical:35,
    paddingHorizontal:20,
    alignSelf:'center',
    position:'absolute',
    top:ScreenHeight * 0.3,
    left:leftValue,
    right:leftValue,
    borderRadius:5
  },
  input:{
    width:285,
    alignSelf:'center',
  },
  btn:{
    width:285,
    marginTop:20,
    alignSelf:'center',
  }
});