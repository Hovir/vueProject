// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import HelloWorld from './components/HelloWorld'
import './style/theme.css'
import './style/character.css'
import store from './store/store'
import VueCookies from 'vue-cookies'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'

Vue.use(VueDirectiveImagePreviewer)
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueCookies)

axios.defaults.timeout = 6000
// axios.defaults.baseURL = '/api/' // 开发环境本地调试
// axios.defaults.baseURL = 'http://192.168.1.169:8090' // 设置打包项目后axios请求前缀
axios.defaults.baseURL = 'http://2546x693a8.qicp.vip/'
axios.defaults.withCredentials = true // 设置允许axios请求携带cookie

// 全局组件注册
// Vue.component('HelloWorld', HelloWorld)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  console.log(config)
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if (config.method === 'post' && config.data.constructor !== FormData) { // post请求时，处理数据
    config.data = qs.stringify({
      ...config.data // 后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据
    })
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
