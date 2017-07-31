import React, {PureComponent, PropTypes} from "react";
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import Bar from "./Bar.js";

const {width} = Dimensions.get("window");

export default class ProgressBarDialog extends PureComponent {
  constructor(props) {
    super(props);

  }
  static propTypes = {
    ...Modal.propTypes,
    title: PropTypes.string,
    canclePress: PropTypes.func,
    cancleText: PropTypes.string,
    needCancle: PropTypes.bool
  };

  static defaultProps = {
    animationType: "none",
    transparent: true,
    progressModalVisible: false,
    onShow: () => {},
    onRequestClose: () => {},
    onOutSidePress: () => {},
    title: "上传文件",
    cancleText: "取消是",
    canclePress: () => {},
    needCancle: true
  };

  render() {
    const {
      animationType,
      transparent,
      onRequestClose,
      progress,
      title,
      canclePress,
      cancleText,
      needCancle,
      progressModalVisible
    } = this.props;
    //
    let cancleView = (
      <View style={styles.cancleContainer}>
        <TouchableOpacity style={styles.cancleButton} onPress={canclePress}>
          <Text style={styles.cancleText}>{cancleText}</Text>
        </TouchableOpacity>
      </View>
    );
    return (
      <Modal animationType={animationType} transparent={transparent} visible={progressModalVisible} onRequestClose={onRequestClose}>
        <View style={styles.progressBarView}>
          <View style={styles.subView}>
            <Text style={styles.title}>{title}</Text>
            <Bar ref={this.refBar}
              style={[styles.barStyle]}
              backgroundStyle={styles.barBackgroundStyle}
              progress={progress}></Bar>
            <View style={styles.progressContainer}>
              <Text style={styles.progressLeftText}>{"${progress}"}%</Text>
              <Text style={styles.progressRightText}>{"${progress}"}/100</Text>
            </View>
            {needCancle && cancleView}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  progressBarView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  subView: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#fff',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  barStyle: {
    marginLeft: 10,
    marginRight: 10,
    width: width - 80
  },
  progressLeftText: {
    fontSize: 14
  },
  cancleContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  progressRightText: {
    fontSize: 14,
    color: '#666666'
  },
  barBackgroundStyle: {
    backgroundColor: '#cccccc'
  },
  progressContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
  },

  progressView: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 5,
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'left',
    padding: 10,
    fontSize: 16
  },
  cancleButton: {
    padding: 10
  },
  cancleText: {
    textAlign: 'right',
    paddingTop: 0,
    fontSize: 16,
    color: 'rgba(0, 122, 255, 1)'
  }
});
