import {action} from 'mobx';
import {extendObservable} from 'mobx'


class AppStore {
  constructor(){
    const that = this;
    extendObservable(this, {
      utc: 0,
      api:'',
      reTryMode:false,
      handleUTC: action((utc)=>{
        that.utc = utc
      }),
      handleAPI: action((api)=>{
        that.api = api
      }),
      handleRetryMode: action((reTryMode)=>{
        that.reTryMode = reTryMode
      })
    })
  }
}

export default new AppStore()