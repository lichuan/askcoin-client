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
// import Test from "./src/module/login/activity/loadingserveractivity.js"
import Test from "./src/module/login/layout/activity_loadingserver.js"
// import Test from "./src/test/menutest.js"
AppRegistry.registerComponent('AskProject', () => Test);
