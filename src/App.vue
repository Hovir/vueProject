<template>
  <div id="app">
    <div class="appClass" v-if="$route.meta.topperAlive">
      <topper></topper>
      <router-view v-if="isRouterAlive"/>
    </div>
    <div class="appClass" v-if="!$route.meta.topperAlive">
      <router-view v-if="isRouterAlive"/>
    </div>
  </div>
</template>

<script>
import Topper from './page/Topper'
import VueCookies from 'vue-cookies'
import store from './store/store'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  },
  created () {
    let token = VueCookies.get('Login_token')
    if (token !== null) {
      store.commit('setUserInfo', token.userInfo)
    }
  },
  components: {
    'Topper': Topper
  }
}
</script>

<style>
  #app{
    margin:0 auto;
    padding: 0;
  }
  .appClass{
    /*border:1px solid red;*/
    margin:0 auto;
    padding: 0;
    /*background-image: url("https://hovirspace.oss-cn-beijing.aliyuncs.com/mallProject/carousel/yourname.jpg");*/
    background-color: rgba(174,174,174,0.86);
    background-repeat:no-repeat;
    background-size:cover;
    background-position: center 0;
    background-attachment:fixed;/*内容滚动背景不动*/
    -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover;/* 兼容Opera */
  }
</style>
