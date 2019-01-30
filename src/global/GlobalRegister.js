import {Platform} from 'react-native';

var {COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio} = require('../constants/index');

var GLOBAL = global;

// CONSTANT 注册全局常量
GLOBAL.COLOR = COLOR;
GLOBAL.STYLE = STYLE;
GLOBAL.FONTSIZE = FONTSIZE;
GLOBAL.URL = URL;

GLOBAL.ScreenWidth = ScreenWidth;
GLOBAL.ScreenHeight = ScreenHeight;
GLOBAL.GlobalPixelRatio = GlobalPixelRatio;
GLOBAL.X_WIDTH = 375;
GLOBAL.X_HEIGHT = 812;

GLOBAL.getSmallDP = (dp) => {
  if (dp * GlobalPixelRatio < 1) {
      return 1.0 / GlobalPixelRatio;
  } else {
      return dp;
  }
}

GLOBAL.isIphoneX = () =>{
  return (
    Platform.OS === 'ios' &&
    ((ScreenWidth === X_HEIGHT && ScreenWidth === X_WIDTH) ||
    (ScreenHeight === X_WIDTH && ScreenWidth === X_HEIGHT))
  )
};

module.exports = {};
