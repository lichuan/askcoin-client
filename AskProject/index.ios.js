/**
启动ios的入口
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LanunchApp from "./src/main/activity/LaunchApp.js"
// import Test from "./src/module/login/activity/BackupActivity.js"
// import Test from "./src/module/question/layout/QuestionLayout.js"
// import Test from "./src/module/question/activity/QuestionActivity.js"
// import Test from "./src/test/ListViewTest.js"
AppRegistry.registerComponent('AskProject', () => LanunchApp);
