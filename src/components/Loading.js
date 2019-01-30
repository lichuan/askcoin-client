import React, {Component} from 'react';
import {StyleSheet, View, Text, Modal, ActivityIndicator} from 'react-native';
import BubblesLoader from '../components/BubblesLoader'
import ModalContainer from "../views/modalContainer";


class Loading extends Component {
  render() {
    return (
        <Modal
            transparent
            visible={this.props.show}>
          <ModalContainer>
            <View style={{
              width: ScreenWidth / 10 * 9,
              backgroundColor: '#fff',
              borderRadius: 5,
              overflow: 'hidden',
              paddingVertical:24,
              alignItems:'center'
            }}>
              <BubblesLoader dotRadius={18} size={60} color={'#FDF187'}/>
              <Text style={{marginTop:19,fontSize:17,color:'#333333',paddingHorizontal:24}}>{this.props.tip}</Text>
            </View>
          </ModalContainer>
        </Modal>
    )

  }
}

export default Loading
