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

import LanunchApp from "./src/main/activity/LaunchApp.js"

AppRegistry.registerComponent('AskProject', () => LanunchApp);
