import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem, removeItem } from '@/utils/storage.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('userToken')
  },
  mutations: {
    // 存储 token 值
    getToken(state, token) {
      state.token = token
      setItem('userToken', token)
    },
    // 用户退出 移除本地存储 token重新获取
    removeToken(state) {
      removeItem('userToken')
      state.token = getItem('userToken')
    }
  },
  actions: {},
  modules: {}
})
