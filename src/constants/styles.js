/**
 * Created by clude on 1/11/16.
 */

import {
    Dimensions,
    PixelRatio,
    Platform
} from 'react-native';

const COLOR = {
  primaryDarkColor:'#00796B',
  primaryColor:'#fdf187',
  secondaryColor:'#f5ba1a',
  normalColor:'#f0ab51',
  grayColor:'#c8c8c8',
  primaryTextColor:'#222',
  normalTextColor:'#333',
  grayTextColor:'#c9c9c9',
  borderColor:"#f5c020",
  bgColor:'#f8f8f8',
  diverColor:'#e7e7e7',
  whiteColor:'#fff',
  btnColor:'#BE8200'
};

const FONTSIZE = {
  bigger:20,
  large:17,
  primary:17,
  normal:15,
  small:12,
};

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const GlobalPixelRatio = PixelRatio.get();



const STYLE = {
  BACKGROUND: {
    flex: 1,
    backgroundColor: COLOR.bgColor,
  }
};

const CONST = { COLOR, STYLE, FONTSIZE, ScreenWidth, ScreenHeight, GlobalPixelRatio};

module.exports = CONST;
