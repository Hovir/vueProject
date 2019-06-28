import Vue from 'vue'
import Vuex from 'vuex'
// import VueCookies from 'vue-cookies'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    getUserInfo: state => {
      return state.userInfo
    }
  },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    clearUserInfo (state) {
      state.userInfo = null
    }
  },
  actions: {
  }
})
export default store
