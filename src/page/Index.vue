<template>
  <div id="index">
    <carousel></carousel>
    <dynamic-list></dynamic-list>
  </div>
</template>

<script>
import Carousel from './Carousel'
import DynamicList from './DynamicList'
import Topper from './Topper'

export default {
  name: 'Index',
  data () {
    return {
      nickname: '',
      userId: ''
    }
  },
  methods: {
  },
  created: function () {
    let userInfo = this.$store.getters.getUserInfo
    if (userInfo != null) {
      // console.log('store中有用户信息')
      this.nickname = userInfo.nickname
      this.userId = userInfo.id
    }
  },
  components: {
    'Carousel': Carousel,
    'DynamicList': DynamicList,
    'Topper': Topper
  }
}
</script>

<style>
  #index{
    margin:0 auto;
    width:1300px;
    /*width:100%;*/
  }
</style>
