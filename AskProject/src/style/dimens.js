//import {devDpi} from "../../../style/dimens.js";
import {PixelRatio, Dimensions} from "react-native";
//屏幕的高度
export const devHeight = Dimensions.get("window").height;
export const devWidth = Dimensions.get("window").width;
//倒出密度
export const devDpi = PixelRatio.get();

//以尺寸2为目标
 getAdapterSize = (size) => {
  if (devDpi == 1) {
    let n = size / 2;
    return n;
  } else if (devDpi == 1.5) {
    let m = size * 0.5;
    let n = size / 2;
    return m + n;
  } else if (devDpi == 2) {
    return size;
  } else if (devDpi == 3) {
    let n = size / 2;
    return size + n;
  } else if (devDpi == 3.5) {
    let m = size * 0.5;
    let n = size / 2;
    return size + m + n;
  } else {
    return size;
  }
}
export {getAdapterSize};
