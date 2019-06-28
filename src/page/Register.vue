<template>
  <div class="login">
    <div class="middleDiv">
      <div class="login_card">
        <div class="login_form">
          <!--<input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">-->
          <input type="text" onkeyup="this.value=this.value.replace(/\s+/g,'')" value="" class="qxs-ic_user qxs-icon"  placeholder="昵称" v-model="nickname">
          <input type="password"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
          <el-button class="login_btn" @click.native="register" type="primary">注册</el-button>
          <router-link style="text-decoration: none;" to="/login"><div class="goLogin">登录>></div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      nickname: '',
      password: ''
    }
  },
  methods: {
    register () {
      if (!this.nickname) {
        this.$message.error('请输入昵称')
        return
      }
      var ruleNick = /[\u4e00-\u9fa5a-zA-Z]{3,9}$/
      if (!ruleNick.exec(this.nickname)) {
        this.$message.error('昵称由3~9个汉字或字母组成')
        return false
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      console.log(this.password.length)
      var rulePass = /^(\w){6,12}$/
      if (!rulePass.exec(this.password)) {
        this.$message.error('密码由6~12个字母、数字、下划线组成')
        return false
      }
      var formData = new FormData()
      formData.append('nickname', this.nickname)
      formData.append('password', this.password)
      this.$http.post('/userInfo/userRegister', formData).then((res) => {
        let status = res.data.status
        let message = res.data.message
        if (status === 1) {
          this.$message.success(message)
          this.$router.push({
            path: '/login'
          })
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
  .goLogin{
    margin-top: 20px;
    font-size: small;
    color: rgba(40,71,255,0.77);
    cursor: pointer;
    text-align: right;
  }
  .login_card{
    margin: 0 auto;
    margin-top: 135px;
    width: 400px;
    height: 250px;
    background-color: rgba(204,204,204,0.77);
    box-shadow: rgba(0,0,0,0.86) 0px 0px 10px 1px;
    padding-top: 40px;
    border-radius: 5px;
  }
  .middleDiv{
    margin: 0 auto;
    width: 980px;
    position: relative;
    height: 400px;
    border: 1px solid transparent;
  }
  .login{
    position:relative;
    top:0;
    left:0;
    height:700px;
    width:100%;
    margin:0 auto;
    background-image: url("https://hovirspace.oss-cn-beijing.aliyuncs.com/mallProject/carousel/registePic.png");
    background-repeat:no-repeat;
    background-size:cover;
    background-position: center 0;
    background-attachment:fixed;/*内容滚动背景不动*/
    -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover;/* 兼容Opera */
  }
  .login_form {
    margin: 0 auto;
    height: 230px;
    width:300px;
  }
  .qxs-ic_user {
    background: url("../assets/logo.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    display: block;
  }
  .qxs-ic_password {
    background: url("../assets/logo.png") no-repeat;
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 30px;
    display: block;
  }
  .login_logo {
    height: 100%;
  }
  .login_btn {
    width: 100%;
    font-size: 16px;
  }
</style>
