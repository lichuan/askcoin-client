import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, Button} from 'react-native';

var ITEM_HEIGHT = 100;
export default class FlatListDemo extends Component {
  _flatList;

  _header = () => {
    var mView = (
      <Text style={[
        styles.txt, {
          backgroundColor: "black"
        }
      ]}>这是头部</Text>
    );
    return mView;
  }
  _footer = () => {
    var mView = (
      <Text style={[
        styles.txt, {
          backgroundColor: "black"
        }
      ]}>这是尾部</Text>
    );
    return mView;
  }
  _separator = () => {
    var mView = (<Text style={{
      height: 2,
      backgroundColor: 'yellow'
    }}/>);
    return mView;
  }

  _renderItem = (item) => {
    console.log("当前项，解析", JSON.stringify(item));
    var txt = '第' + item.index + '个' + ' title=' + item.item.title;
    var bgColor = item.index % 2 == 0
      ? 'red'
      : 'blue';
    return <Text style={[
      {
        flex: 1,
        height: ITEM_HEIGHT,
        backgroundColor: bgColor
      },
      styles.txt
    ]}>{txt}</Text>
  }

  render() {
    var data = [];
    for (var i = 0; i < 100; i++) {
      data.push({
        key: i,
        title: i + ''
      });
    }
    //
    var mView = (
      <View style={[{
          flex: 1
        }
      ]}>
        <Button title="滚动到指定位置" onPress={() => {
          // this._flatList.scrollToOffset({animated: true, offset: 2000});
        }}></Button>
        <View style={{
          flex: 1
        }}>
          <FlatList ref={() => {
            // console.log("ref的值", flatList);
            console.log("ref的值");
            // this._flatList = flatList
          }}  renderItem={this._renderItem} data={data}></FlatList>
        </View>
      </View>
    );
    //
    return mView;
  }
}

const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 30
  }
});
