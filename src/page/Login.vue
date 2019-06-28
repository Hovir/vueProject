<template>
  <div class="login">
    <!--<div class="outer_label">-->
      <!--<img class="inner_label login_logo" src="../assets/logo.png">-->
    <!--</div>-->
    <div class="middleDiv">
      <div class="login_card">
        <div class="login_form">
          <!--<input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">-->
          <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="昵称" v-model="nickname">
          <input type="password"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
          <el-button class="login_btn" @click.native="login" type="primary">登录</el-button>
          <router-link style="text-decoration: none;" to="/register"><div class="goRegist">注册>></div></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      nickname: '',
      password: '',
      isBtnLoading: false
    }
  },
  created () {
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    login () {
      if (!this.nickname) {
        this.$message.error('请输入昵称')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      this.$http({
        method: 'post',
        url: '/userInfo/userLogin',
        data: {
          nickname: this.nickname,
          password: this.password
        },
        params: {
        }
      }).then((res) => {
        // 接口返回状态
        let status = res.data.status
        // 成功
        if (status === 1) {
          let dataValue = res.data.dataValue
          let userInfo = dataValue.userInfo
          // 将用户信息存入state
          this.setUserInfo(userInfo)
          // 跳转到首页
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
  .goRegist{
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
    background-image: url("https://hovirspace.oss-cn-beijing.aliyuncs.com/mallProject/carousel/loginPic.png");
    background-repeat:no-repeat;
    background-size:cover;
    background-position: center 0;
    background-attachment:fixed;/*内容滚动背景不动*/
    -webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */
    -o-background-size: cover;/* 兼容Opera */
    /*z-index: -1;*/
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
    /*background: -webkit-linear-gradient(left, #000099, #2154FA); !* Safari 5.1 - 6.0 *!*/
    /*background: -o-linear-gradient(right, #000099, #2154FA); !* Opera 11.1 - 12.0 *!*/
    /*background: -moz-linear-gradient(right, #000099, #2154FA); !* Firefox 3.6 - 15 *!*/
    /*background: linear-gradient(to right, #000099 , #2154FA); !* 标准的语法 *!*/
    /*filter: brightness(1.4);*/
  }
</style>
