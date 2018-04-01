/**
 * Created by xiaoming on 2018/3/24.
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

export default class RegisterInputItem extends Component {

  static propTypes = {
    placeholder:TextInput.propTypes.placeholder,
    maxLength:TextInput.propTypes.maxLength,
    value:TextInput.propTypes.value,
    keyboardType:TextInput.propTypes.keyboardType,
    secureTextEntry:TextInput.propTypes.secureTextEntry,
    onChangeText:TextInput.propTypes.onChangeText,
    textStyle:TextInput.propTypes.style,
    disabled:TouchableOpacity.propTypes.disabled,
    editable:TextInput.propTypes.editable,
    source:Image.propTypes.source
  };

  constructor(props) {
    super(props);
    this.state = {};
  }



  componentWillMount() {

  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={[styles.box,this.props.itemStyle]}>
        <Image
          source={this.props.source}
          style={styles.icon}/>
        <TextInput
          style={[styles.input,this.props.textStyle]}
          underlineColorAndroid={'transparent'}
          placeholder={this.props.placeholder}
          placeholderTextColor={COLOR.grayTextColor}
          value={this.props.value}
          keyboardType={this.props.keyboardType}
          secureTextEntry={this.props.secureTextEntry}
          onChangeText={this.props.onChangeText}
          editable={this.props.editable}
          maxLength={this.props.maxLength}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box:{
    borderBottomWidth: 1,
    borderColor:COLOR.borderColor,
    width: 275,
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center'
  },
  input:{
    padding: 0,
    flex: 1,
    fontSize: FONTSIZE.normal,
    color: COLOR.normalTextColor,
    marginLeft:15
  },
  icon:{
    width: 16,
    height: 17,
  },
});