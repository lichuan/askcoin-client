
/**
启动app
**/
import React,{Component} from "react";


import WelcomeActivity from "../../module/login/activity/welcomeactivity.js";
// import Logo from "../../module/login/ui/loginLogoview.js";
// import WelcomeLayout from "../../module/login/layout/activity_welcome.js";

export default class LaunchApp extends Component{
    render(){
        var mView =
            (<WelcomeActivity style={{flex:1}}></WelcomeActivity>);
        return mView;
    }
}
