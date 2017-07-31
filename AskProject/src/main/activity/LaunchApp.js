/**
启动app
**/
import React, {Component} from "react";

import {StackNavigator} from 'react-navigation';

//欢迎界面
import WelcomeActivity from "../../module/login/activity/welcomeactivity.js";
//服务器ip选择界面
import loadingseverActivity from "../../module/login/activity/loadingseveractivity.js";
//注册界面
import RegisterActivity from "../../module/login/activity/registeractivity.js";
//备份界面
import BackupActivity from "../../module/login/activity/BackupActivity.js";
import ResumeWalletActivity from "../../module/login/activity/ResumeFromWalletActivity.js";


//
var LaunchApp = StackNavigator({
  //欢迎界面
  Welcome: {
    screen: WelcomeActivity
  },
  //服务器选择界面
  ServerIp:{
    screen: loadingseverActivity
  },
  //注册界面
  Register:{
    screen: RegisterActivity
  },
  //备份界面
  Backup:{
    screen: BackupActivity
  },
  //恢复备份界面，从钱包
  ResumeFromWallet:{
    screen:ResumeWalletActivity
  }
});



export default LaunchApp;
