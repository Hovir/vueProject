<!--个人信息-->
<template>
  <div class="myInfo">
    <div class="backPic">
      <div class="infoContent">
        <div class="block">
          <img class="img_header" :src="avater?avater:url" />
          <input type="file" name="file" class="hiddenInput" accept="image/gif,image/jpeg,image/jpg,image/png" @change="fileChange">
        </div>
        <div class="setting_right" >
          <span class="caption" @click.stop="uploadHeadImg">更换头像</span>
        </div>
        <div class="login_form">
          <div><input type="text"  class="qxs-icon"  placeholder="昵称" v-model="nickname"></div>
          <div class="commitDiv">
            <el-button @click.native="commit" type="primary" :loading="isBtnCommit">确认修改</el-button>
          </div>
          <div class="exitDiv"><el-button @click.native="loginOut" size="small">退出登录</el-button></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  inject: ['reload'],
  data () {
    return {
      nickname: '',
      isBtnCommit: false,
      url: require('../assets/unlogin.jpg'),
      avater: '',
      userId: '',
      picUrl: '',
      avaterFile: ''
    }
  },
  created () {
    let userInfo = this.$store.getters.getUserInfo
    this.nickname = userInfo.nickname
    this.userId = userInfo.id
    this.avater = userInfo.avatar
    this.picUrl = userInfo.avatar
  },
  computed: {
    btnText () {
      if (this.isBtnCommit) return '提交中...'
      return '提交'
    }
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    // 触发input
    uploadHeadImg: function () {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 头像选择
    fileChange (e) {
      // 图片回显方式1
      /* var that = this
      var file = e.target.files[0]
      var reader = new FileReader()
      reader.onload = function (e) {
        that.avater = e.target.result
      }
      reader.readAsDataURL(file) */
      // 图片回显方式2
      this.avater = URL.createObjectURL(e.target.files[0])
      // 用户上传的头像文件
      this.avaterFile = e.target.files[0]
    },
    // 提交修改
    commit () {
      // avaterFile不为空代表用户上传了头像
      if (this.avaterFile) {
        const isLt2M = this.avaterFile.size / 1024 / 1024 < 2
        if (!isLt2M) {
          return this.$message.error('上传图片大小不能超过 2MB!')
        }
        // 创建表单 调用上传头像接口
        var uploadFormData = new FormData()
        uploadFormData.append('file', this.avaterFile)
        uploadFormData.append('folder', 'headPic')
        this.$http.post('/userInfo/uploadFile', uploadFormData).then((res) => {
          // 接口返回图片地址
          this.picUrl = res.data
          // console.log('接口返回图片地址' + this.picUrl)
          if (this.picUrl === null) {
            this.$message.error('头像上传失败')
            return false
          }
          this.commitUpdate()
        }).catch(function (err) {
          console.log('错误信息:' + err)
        })
      } else {
        this.commitUpdate()
      }
    },
    commitUpdate: function () {
      // 调用提交修改接口
      if (!this.nickname) {
        this.$message.error('请输入昵称')
        return false
      }
      var ruleNick = /[\u4e00-\u9fa5a-zA-Z]{3,9}$/
      if (!ruleNick.exec(this.nickname)) {
        this.$message.error('昵称由3~9个汉字或字母组成')
        return false
      }
      if (!this.picUrl) {
        this.picUrl = ''
        console.log('用户未上传头像，使用默认')
      }
      var formData = new FormData()
      formData.append('nickname', this.nickname)
      formData.append('id', this.userId)
      formData.append('avatar', this.picUrl)
      this.$http.post('/userInfo/updateUserInfo', formData).then((res) => {
        let status = res.data.status
        let message = res.data.message
        if (status === 1) {
          let userInfo = res.data.dataValue.userInfo
          // 将修改后的用户信息存入state
          this.setUserInfo(userInfo)
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
    },
    loginOut: function () {
      // 请求登出接口
      this.$http({
        method: 'get',
        url: '/userInfo/signOut'
      }).then((res) => {
        if (res.data.status === 1) {
          // 清除state中的用户信息
          this.$store.commit('clearUserInfo')
          this.$message.success(res.data.message)
          this.$router.push({path: '/'})
        } else {
          this.$message.error(res.data.message)
        }
      }).catch(function (err) {
        console.log('错误信息:' + err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .infoContent{
    /*margin: 50px auto 0px;*/
    margin: 0 auto;
    margin-right:100px;
    padding-top: 20px;
    width:250px;
    background-color: rgba(255,251,251,0.86);
    height:480px;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.86) 0px 0px 10px 1px;
  }
  .myInfo{
    margin: 0 auto;
    width:1300px;
    /*display: flex;*/
    min-height: 650px;
  }
  .backPic{
    background-image: url("../assets/yourname.jpg");
    padding-top: 50px;
    min-height: 650px;
    background-repeat:no-repeat;
    background-size:cover;
    background-position: center 0;
    background-attachment:fixed;/*内容滚动背景不动*/
    -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover;/* 兼容Opera */
  }
  .myInfo .block{
    position: relative;
    /*margin-top: 50px;*/
    text-align: center;
    /*height:100px;*/
    /*width:1300px;*/
  }
  .myInfo .img_header{
    width:100px;
    height: 100px;
    border-radius:10px;
    object-fit: scale-down;
  }
  .login_form {
    padding-top: 3%;
    text-align: center;
  }
  .myInfo .qxs-icon{
    height: 40px;
    width: 50%;
    margin-bottom: 50px;
    padding-left: 2%;
    border: 0;
    border-bottom: solid 1px lavender;
    background-color: rgba(255,251,251,0.86);
    border-radius: 5px;
  }
  .setting_right{
    display: flex;
    height: 40px;
    justify-content:center;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    font-size: 15px;
    height: 20px;
    cursor:pointer;
  }
  .commitDiv{
    margin-top: 90px;
  }
  .exitDiv{
    margin-top: 30px;
  }
</style>
