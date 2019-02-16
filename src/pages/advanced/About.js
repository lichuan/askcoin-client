import React,{Component} from 'react'
import styled from 'styled-components/native'
import {View} from "react-native";
import {I18n} from "../../language/I18n";
import {appState} from '../../net/net'
import {observer} from 'mobx-react';

var Buffer = require('buffer/').Buffer;



const Item = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #E7E7E7;
  background-color: #fff;
`

Item.Title = styled.Text`
  color: #222222;
  font-size: 17px;
`

Item.Content = styled.Text`
  color: #666666;
  font-size: 17px;
  margin-top: 8px;
`

class About extends Component{
  render(){
    return (
      <View style={{backgroundColor:'#f2f2f2',flex:1}}>
        <Item>
          <Item.Title>{I18n.t('appVersion')}</Item.Title>
          <Item.Content>{'0.0.3'}</Item.Content>
        </Item>
        <Item>
          <Item.Title>{I18n.t('nodeVersion')}</Item.Title>
          <Item.Content>{`${appState.version.toString().slice(7,9) === ''? '0':appState.version.toString().slice(7,9) }.${appState.version.toString().slice(4,7) === ''?'0':appState.version.toString().slice(4,7)}.${appState.version.toString().slice(0,4)}`}</Item.Content>
        </Item>
        <Item>
          <Item.Title>{I18n.t('curID')}</Item.Title>
          <Item.Content>{appState.blockID}</Item.Content>
        </Item>
        <Item style={{flexDirection:'column',alignItems:'flex-start'}}>
          <Item.Title >{I18n.t('curHash')}</Item.Title>
          <Item.Content>{appState.blockHash}</Item.Content>
        </Item>
        <Item style={{flexDirection:'column',alignItems:'flex-start',borderBottomWidth:0}}>
          <Item.Title >{`${I18n.t('curHash')} (hex)`}</Item.Title>
          <Item.Content>{Buffer.from(appState.blockHash, 'base64').toString('hex')}</Item.Content>
        </Item>
      </View>
    )
  }
}



export default observer(About)