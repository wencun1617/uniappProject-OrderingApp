import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  //从本地缓存中同步获取指定 key 对应的内容
  cart: uni.getStorageSync('cart') ? JSON.parse(uni.getStorageSync('cart')) : [],
  addressLists: uni.getStorageSync('addressLists') ? JSON.parse(uni.getStorageSync('addressLists')) : [],
  /**
   * 是否需要强制登录
   */
  forcedLogin: false,
  hasLogin: false,
  userName: "",
  imgaddress: '/static/picture/profile/avatar.png'
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
  }
})
