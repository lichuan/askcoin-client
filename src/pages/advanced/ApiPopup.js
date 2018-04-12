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
  Modal
} from 'react-native';
import PropTypes from 'prop-types';
import InputBox from '../../components/InputBox';
import Button from '../../components/Button';
import ApiIcon from '../../resource/icons/api.png';

const leftValue = (ScreenWidth - 285 - 40) / 2;
export default class ApiPopup extends Component {
  static propTypes = {
    onRequestClose:PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      value:''
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
      value: ''
    });
    this.props.onRequestClose && this.props.onRequestClose();
  }


  onCommit(){
    let v = this.state.value.trim();
    if(!v){
      return;
    }else{

    }
  }


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
                this.setState({value:v})
              }}
              value={this.state.value}
              placeholder={'请输入API节点服务器'}
              source={ApiIcon}
              itemStyle={styles.input}
              showRightImage={false}/>
            <Button
              onPress={()=>{
                this.onCommit()
              }}
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