////AskProject/src/style/appstyle.js
import {StyleSheet} from "react-native";
import {getAdapterSize} from "./dimens.js"
//字体style
export const fontstyles = StyleSheet.create({
  //主要text
  mainTextSize: {
    fontSize: getAdapterSize(15),
  }
});
