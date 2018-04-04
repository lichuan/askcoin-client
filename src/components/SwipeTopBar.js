import React,{Component} from 'react';
const { ViewPropTypes } = ReactNative = require('react-native');
const {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity
} = ReactNative;
import PropTypes from 'prop-types';

const Button = (props) => {
  if (Platform.OS=='android') {
    return <TouchableNativeFeedback
      delayPressIn={0}
      background={TouchableNativeFeedback.SelectableBackground()} // eslint-disable-line new-cap
      {...props}>
      {props.children}
    </TouchableNativeFeedback>;
  } else {
    return <TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>;
  }
};



class SwipeTopBar extends Component{
  static propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  };

  static defaultProps = {
    activeTextColor: 'navy',
    inactiveTextColor: 'black',
    backgroundColor: null,
  };

  renderTabOption(name, page) {

  };

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    console.log(name);
    return <Button
      style={styles.flexOne}
      key={name}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      onPress={() => onPressHandler(page)}
    >
      <View style={[styles.tab, this.props.tabStyle, ]}>
        <Text style={[{color: textColor, fontWeight, }, textStyle, ]}>
          {name}
        </Text>
      </View>
    </Button>;
  }

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const index = this.props.activeTab;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
      alignItems: 'center',
    };

    const tabUnderlineBackgroundView = Object.assign({},tabUnderlineStyle,{
      width: containerWidth,
      backgroundColor: COLOR.bgColor,
      height: this.props.underlineStyle.height,
      left: 0,
    });

    const left = {
      transform: [
        {
          translateX: this.props.scrollValue.interpolate({
            inputRange: [0, 1,],
            outputRange: [0, containerWidth / numberOfTabs * 2 / 3,],
          })
        }
      ]
    }

    const icon = {fontSize:40,transform:[{translateY: -20}],backgroundColor:'rgba(0,0,0,0)'};

    return (
      <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor, }, this.props.style, ]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab.bind(this);
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <View style={tabUnderlineBackgroundView}></View>
        <Animated.View style={[tabUnderlineStyle,this.props.underlineStyle,left]}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexOne: {
    flex: 1
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
});

export default SwipeTopBar;
