import {action} from 'mobx';
import {extendObservable} from 'mobx'


class UserStore {
  constructor(){
    const that = this
    extendObservable(this, {
      name: '',
      avatar: 0,
      id: 0,
      balance: 0,
      queryUser: {
        name: '',
        avatar: -1,
        id: 0,
        pubkey:''
      },
      handleName: action((name)=>{
        that.name = name
      }),
      handleAvatar: action((avatar)=>{
        that.avatar = avatar
      }),
      handleID: action((id)=>{
        that.id = id
      }),
      handleBalance: action((balance)=>{
        that.balance = balance
      }),
      handleQueryUser: action((queryUser)=>{
        that.queryUser = queryUser;
      })
    })
  }
}

export default new UserStore()