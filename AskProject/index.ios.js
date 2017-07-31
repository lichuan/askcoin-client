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
// import Test from "./src/module/login/layout/activity_resume_wallet.js"
// import Test from "./src/base/widget/Toast.js"
AppRegistry.registerComponent('AskProject', () => LanunchApp);
