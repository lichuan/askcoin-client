/**
 * Created by xiaoming on 2018/3/27.
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

import openIcon from '../resource/icons/gj_bt.png';
import closeIcon from '../resource/icons/gj_bt_no.png';
import PropTypes from 'prop-types';

export default class SwitchButton extends Component {
  static propTypes = {
    isOpen:PropTypes.bool,
    onValueChange:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen:this.props.isOpen ? this.props.isOpen : false
    };
  }

  render() {
    const { onValueChange } = this.props;
    return (
      <TouchableOpacity
        onPress={()=>{
          this.setState({
            isOpen:!this.state.isOpen
          });
          onValueChange && onValueChange(!this.state.isOpen);
        }}>
        <Image
          source={this.state.isOpen ? openIcon : closeIcon}
          style={styles.icon}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  icon:{
    width:39,
    height:26,
    resizeMode:'contain'
  }
});