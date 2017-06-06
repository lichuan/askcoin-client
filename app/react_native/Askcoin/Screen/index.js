/**
 * Created by zhuguoqing on 2017/6/5.
 * Screen 是一个页面
 * 所有的Screen都应该从这里输出
 */
import Launch from './Launch'
import Main   from './Main'
import Responder from './Responder'
import Transfer from './Transfer'
import Mine from './Mine'

/**
 * routeKey用来定位rootComponent的
 * 所以routeKey要与rootComponent的上一层key一致
 * */
module.exports  = {
  Launch: {
    rootComponent: Launch,
    routeKey: 'Launch',
    description: '启动页'
  },
  Main: {
    rootComponent: Main,
    routeKey: 'Main',
    description: '首页'
  },
  Mine:{
    rootComponent: Mine,
    description: '我的'
  },
  Transfer:{
    rootComponent:Transfer,
    description: '转账'
  },
  Responder:{
    rootComponent: Responder,
    description: '抢答'
  }
}
