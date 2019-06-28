<template>
  <div id="dynamicList">
    <loading v-if="isLoading"></loading>
    <div class="overall">
      <div class="content-module">
        <!--<router-link :to="{path:'',query:{dynamicId:dynamic.id}}">-->
          <div class="single-module" v-on:click="singleDynamic(dynamic.id)" v-for="(dynamic,index) in dynamicList" v-bind:key="index">
            <el-image
              style="width: 100%; height: 85%"
              :src="dynamic.picPath"
              :fit="fit">
            </el-image>
            <div style="margin-top: 5px">{{ dynamic.title }}</div>
          </div>
        <!--</router-link>-->
      </div>
      <div class="pagination">
        <el-pagination
          background
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="totalCount"
          @size-change="sizeChange"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/page/Loading'
export default {
  components: {
    'Loading': Loading
  },
  data () {
    return {
      isLoading: true,
      // url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2748328519,2781894601&fm=26&gp=0.jpg',
      fit: 'contain',
      page: 1,
      pageSize: 12,
      dynamicList: '',
      totalCount: 0
    }
  },
  methods: {
    sizeChange: function (size) {
      alert('sizeChange')
      alert(size)
    },
    currentChange: function (currentPage) {
      this.page = currentPage
      this.getDynamicList(currentPage, this.pageSize)
    },
    // 跳转到单个动态信息
    singleDynamic: function (dynamicId) {
      this.$router.push({
        path: '/picSingleRelease',
        query: {
          dynamicId: dynamicId
        }
      })
    },
    getDynamicList: function (page, pageSize) {
      this.$http.get('/dynamic/getDynamicListOnIndex', {
        params: {
          page: page,
          pageSize: pageSize
        }
      }).then(res => {
        this.isLoading = false
        let status = res.data.status
        let message = res.data.message
        if (status === 1) {
          // console.log('分页查询成功')
          this.dynamicList = res.data.dataValue.list
          this.totalCount = res.data.dataValue.total
        } else {
          this.$message.error(message)
        }
      })
    }
  },
  created: function () {
    this.getDynamicList(this.page, this.pageSize)
  }
}
</script>
<style scoped>
  #dynamicList{
    height:720px;
    margin-top:18px;
  }
  .overall{
    margin:0 auto;
    height:100%;
    /*border:1px solid;*/
    width: 90%;
    text-align: center;
  }
  .content-module{
    margin:0 auto;
    float: left;
  }
  .single-module{
    background-color: white;
    border:1px solid rgba(174,174,174,0.77);
    box-shadow: rgba(0,0,0,0.86) 1px 1px 10px 1px;
    border-radius: 4px;
    position: relative;
    width: 260px;
    height: 200px;
    font-size: 12px;
    overflow: hidden;
    float: left;
    margin: 8px 13px 15px 13px;
    cursor:pointer;
  }
  .pagination{
    /*float:right;*/
    /*position: relative;*/
    /*margin-right:20%;*/
    position: absolute;
    margin-top: 680px;
    margin-left: 460px;
  }
</style>
