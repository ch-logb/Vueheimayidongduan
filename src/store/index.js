// 容器管理共享的数据
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

const USER_KEY = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录用户，一个对象 包含token 信息
    user: getItem(USER_KEY)
    // user: null
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止刷新丢失 state中的user状态，我们把它放到本地存储中
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
