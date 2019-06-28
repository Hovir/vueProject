<template>
  <div class="block">
    <el-carousel style="border-radius: 1rem;box-shadow: rgba(0,0,0,0.86) 1px 1px 10px 3px;" :interval="3000">
      <el-carousel-item v-for="(item, index) in showCard" :key="index">
        <el-image style="width: 100%; height: 100%" :src="item.url"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.block{
  position: relative;
  margin: 0 auto;
  margin-top: 15px;
  width: 1200px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
<script>
export default {
  data () {
    return {
      // 轮播图数据
      showCard: [
        {
          url: require('../assets/GameTr.jpg')
        },
        {
          url: require('../assets/banner01.jpg')
        },
        {
          url: require('../assets/banner03.jpg')
        },
        {
          url: require('../assets/banner02.jpg')
        },
        {
          // url: 'https://hovirspace.oss-cn-beijing.aliyuncs.com/mallProject/carousel/banner04.jpg'
          url: require('../assets/banner04.jpg')
        }
      ]
    }
  },
  created () {
  },
  methods: {}
}
</script>
