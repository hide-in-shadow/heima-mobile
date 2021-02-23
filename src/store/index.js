import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '@/utils/storage.js'

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
    }
  },
  actions: {},
  modules: {}
})
