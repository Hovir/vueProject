<!--查看单个图片动态-->
<template>
  <div id="myRelease">
    <ul id="releaseUl">
      <li class="releaseli" style="list-style: none" v-for="(dynamic, index) in dynamicList" v-bind:key="index">
        <div class="titleDiv">{{ dynamic.dynamicInfo.title }} <span class="spanPublisher">{{ dynamic.dynamicInfo.createTime | formatDate}} <br/>由 {{ dynamic.dynamicInfo.userNickname }}发表</span></div>
        <div class="divImgClass">
          <img v-image-preview class="imgClass" :src=dynamic.dynamicInfo.picPath />
          <div class="divDes">描述：{{ dynamic.dynamicInfo.des }}</div>
        </div>
        <div id="comment" v-for="(comment, index) in dynamic.commentInfoList" v-bind:key="index">
          <div class="left_head" style="width: 6%;">
            <img class="left_head_img" src="../assets/unlogin.jpg">
          </div>
          <div style="display: inline-block;width: 90%">
            <div style="display: inline-block"><span style="font-size: 14px;color: rgba(98,171,174,0.77);">{{ comment.userNickname }}：</span>{{ comment.content }}</div>
            <div style="font-size: small;color: rgba(83,83,83,0.77);">{{ comment.createTime | formatDate }}</div>
          </div>
        </div>
        <div class="plDiv">
          <input type="text" :id="'contentInput_'+index" placeholder="发表你的精彩评论" />
          <el-button @click="goComment(dynamic.dynamicInfo.id,index)" type="primary" icon="el-icon-edit" circle></el-button>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
</style>

<script>
export default {
  inject: ['reload'],
  data () {
    return {
      dynamicList: '',
      userId: '',
      nickname: ''
    }
  },
  filters: {
    formatDate: function (time) {
      if (time != null && time !== '') {
        return time.substr(0, time.length - 3)
      } else {
        return ''
      }
    }
  },
  methods: {
    goComment (dynamicId, index) {
      let content = document.getElementById('contentInput_' + index).value
      if (!content) {
        this.$message('请输入评论内容！')
        return false
      }
      if (content.length > 50) {
        this.$message.warning('评论字数不超过50个字！')
        return false
      }
      // 发表评论
      var formData = new FormData()
      formData.append('userId', this.userId)
      formData.append('userNickname', this.nickname)
      formData.append('dynamicId', dynamicId)
      formData.append('content', content)
      this.$http.post('/comment/addCommentInfo', formData).then((res) => {
        let status = res.data.status
        let message = res.data.message
        if (status === 1) {
          this.$message.success(message)
          this.reload()
        }
        if (status === 2) {
          this.$message.error(message)
          return false
        }
      }).catch(function (err) {
        console.log('错误信息:' + err)
      })
    }
  },
  created: function () {
    let userInfo = this.$store.getters.getUserInfo
    this.userId = userInfo.id
    this.nickname = userInfo.nickname
    let dynamicId = this.$route.query.dynamicId
    // 查询单个动态信息
    if (dynamicId) {
      this.$http.get('/dynamic/getDynamicAndCommentById', {
        params: {
          dynamicId: dynamicId
        }
      }).then((res) => {
        let status = res.data.status
        let message = res.data.message
        if (status === 1) {
          let dataValue = res.data.dataValue
          let toArray = []
          toArray.push(dataValue)
          this.dynamicList = toArray
        }
        if (status === 2) {
          this.$message.error(message)
          return false
        }
      }).catch(function (err) {
        console.log('错误信息:' + err)
      })
    }
  }
}
</script>
<style scoped>
  .left_head{
    display: inline-block;
  }
  .left_head_img{
    width: 30px;
    height: 30px;
    object-fit: scale-down;
    border-radius: 1rem;
  }
  .plDiv input{
    width: 90%;
    height:40px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    display: inline-block;
    font-size: small;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
  }
  #myRelease{
    display: flex;
    margin:0 auto;
    width:700px;
    min-height: 600px;
  }
  .imgClass{
    height: 90%;
    width: auto;
    cursor:pointer;
  }
  .divImgClass{
    height: 300px;
    width: 500px;
    margin-bottom: 5px;
  }
  .releaseli{
    background-color: rgba(255,251,251,0.77);
    padding: 11px;
    margin-bottom: 20px;
    /*margin-left: 25%;*/
    text-align: left;
    box-shadow: rgba(0,0,0,0.86) 1px 1px 10px 3px;
    border-radius: 10px;
    width:600px;
  }
  .releaseli div{
    width: 98%;
  }
  #comment{
    margin-bottom: 5px;
    font-size: small;
  }
  .divDes{
    font-size: small;
    color: rgba(83,83,83,0.77);
  }
  .spanPublisher{
    float: right;
    font-size: small;
    color: rgba(83,83,83,0.77);
  }
  .titleDiv{
    margin-bottom: 8px;
    margin-left: 8px;
  }
  .plDiv input{
    width: 90%;
    height:40px;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    box-sizing: border-box;
    display: inline-block;
    font-size: small;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
  }
</style>
