/**
启动android的入口
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LanuchApp from "./src/main/activity/LaunchApp.js"
// import LanunchApp from "./src/main/activity/MainActivity.js"
// import Test from "./src/module/login/layout/activity_register.js"
// import Test from "./src/test/progress_spinkit.js"
AppRegistry.registerComponent('AskProject', () => LanuchApp);
