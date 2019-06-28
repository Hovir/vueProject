<template>
  <div id="topper">
    <el-menu :default-active="activeIndex" background-color="rgba(255,251,251,0.86)" class="el-menu1" mode="horizontal" @select="handleSelect">
      <router-link v-if="this.$store.getters.getUserInfo" to="/myInfo">
        <el-menu-item  index="1">我的信息</el-menu-item>
      </router-link>
      <router-link v-if="!this.$store.getters.getUserInfo" to="/login">
        <el-menu-item  index="1">登录</el-menu-item>
      </router-link>
      <router-link to="/myRelease">
        <el-menu-item index="2">我的动态</el-menu-item>
      </router-link>
      <router-link to="/releaseVideo">
        <el-menu-item index="3">发布视频</el-menu-item>
      </router-link>
      <router-link to="/GoRelease">
        <el-menu-item index="4">发布图片</el-menu-item>
      </router-link>
      <router-link to="/">
        <el-menu-item index="5">首页</el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
// import store from '../store/store'
// import VueCookies from 'vue-cookies'
export default {
  inject: ['reload'],
  data () {
    return {
      activeIndex: '1',
      changeDisplay: false
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      this.reload()
    }
  },
  created: function () {
    /* if (store.getters.getUserInfo !== null) {
      this.changeDisplay = true
    }
    let token = VueCookies.get('Login_token')
    if (token !== null) {
      this.changeDisplay = true
    } */
  }
}
</script>

<style>
  #topper{
    margin: 0 auto;
    width: 100%;
  }
  .el-menu1{
    opacity:0.7;
  }
  #topper .el-menu-item{
    float: right;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
  }
</style>
