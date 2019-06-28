<!--发布图片动态-->
<template>
  <div id="goRelease">
    <div class="releaseForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item style="width: 50%;" label="标题名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <!---->
        <el-form-item label="单个图片" class="picClass" prop="picUrl">
          <el-upload
            :with-credentials=true
            :action="uploadAction()"
            :data="uploadData"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :on-error="hanadleError">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <el-input v-model="ruleForm.picUrl"></el-input>
        </el-form-item>
        <!---->
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
          <el-button @click="resetForm('ruleForm')">↺</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        title: '',
        desc: '',
        picUrl: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, min: 0, max: 50, message: '输入不超过 50 个字符', trigger: 'blur' }
        ],
        picUrl: [
          { required: true, message: '请上传图片', trigger: 'blur' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      userId: '',
      userNickname: '',
      uploadData: {
        dynamic: 'dynamic'
      }
    }
  },
  methods: {
    uploadAction: function () {
      return '/userInfo/uploadFile'
      // return '/api/userInfo/uploadFile'
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log('调用后台发布接口')
          var formData = new FormData()
          formData.append('title', this.ruleForm.title)
          formData.append('des', this.ruleForm.desc)
          formData.append('picPath', this.ruleForm.picUrl)
          formData.append('userId', this.userId)
          formData.append('userNickname', this.userNickname)
          this.$http.post('/dynamic/addDynamicInfo', formData).then((res) => {
            // console.log(res)
            if (res.data.status === 1) {
              this.$message.success(res.data.message)
              this.$router.push({path: '/MyRelease'})
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(function (err) {
            console.log('错误信息:' + err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        return this.$message.error('上传文件只能是  JPG或PNG 格式!')
      }
      const isLt8M = file.size / 1024 / 1024 < 8
      if (!isLt8M) {
        return this.$message.error('上传图片大小不能超过 8MB!')
      }

      // console.log('文件上传之前')
      // console.log(file)
    },
    handleRemove (file, fileList) {
      // console.log('移除文件')
    },
    handlePictureCardPreview (file) {
      // console.log('点击文件列表中已上传的文件时')
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    uploadSuccess (response, file, fileList) {
      console.log('文件上传成功')
      console.log(response)
      console.log(file)
      if (response !== null && response !== '') {
        this.ruleForm.picUrl = response
      }
    },
    hanadleError (err, file, fileList) {
      this.$message.error('文件上传失败!')
      console.log(err)
    }
  },
  created: function () {
    let userInfo = this.$store.getters.getUserInfo
    if (userInfo != null) {
      // console.log('store中有用户信息')
      this.userNickname = userInfo.nickname
      this.userId = userInfo.id
    }
  }
}
</script>
<style>
  .picClass .el-input{
    display: none;
  }
  .releaseForm{
    background-color: rgba(255,251,251,0.86);
    margin:30px auto;
    width: 700px;
    padding:70px 80px 50px 50px;
    box-shadow: rgba(0,0,0,0.86) 1px 1px 10px 3px;
    border-radius: 8px;
  }
  #goRelease{
    height: 700px;
  }
  #goRelease .el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
</style>
