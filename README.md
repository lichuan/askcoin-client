# 运行方法
## 依赖环境
```
 node 7.6以上，安装方法：http://www.cnblogs.com/shuigu/p/6189226.html


```
##准备工作
	#安装react-native
	npm install -g react-native-cli

## Androd:
```
#要求安装有 node 7.6以上
# 克隆代码
$git clone git@github.com:lichuan/askcoin-client.git askcoin
# 安装react native依赖库
$cd askcoin/AskProject/ 
$npm install
# 连接设备，可以使用android模拟器，也可以使用真实设备，可以根据自己的情况来判断
接下来，可以有2种方式来启动app
##
方法一(使用androidstudioIDE运行)：
# 启动node服务器
$npm start
#使用IDE打开
用android studio打开askcoin/AskProject/android/
#启动
菜单（Run）-run
###
###
方法二(直接使用命令):
##启动
react-native run-android
```

##IOS:
```
#要求安装有 node 7.6以上
#克隆代码
$git clone git@github.com:lichuan/askcoin-client.git askcoin
#安装react native依赖库
$cd askcoin/AskProject/ 
$npm install
# 连接设备
接下来，可以有2种方式来启动app
##
	方法一(使用Xcode运行)：
	# 启动node服务器
	$npm start
	#使用IDE打开
	$用Xcode打开askcoin/AskProject/ios/AskProject.xcodeproj
	#启动
	菜单（Product）-run
###
###
	方法二(直接使用命令):
	#启动
	$react-native run-ios
```

