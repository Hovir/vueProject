<template>
  <div id="releaseVideo">
    <h2 style="text-align: center;font-family: 楷体;color: #848487;">&lt; 因成本高,本农负担不起... ></h2>
      <div style="margin: 0 auto; width: 700px; text-align: center;">
        <div style="margin-bottom: 5px">💗赞助💗</div>
        <img style="object-fit: scale-down" src="../assets/collect.jpg" height="500px" width="400px"/>
      </div>
    <!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
      <!--<el-form-item label="标题名称" prop="name">-->
        <!--<el-input v-model="ruleForm.name"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="描述" prop="desc">-->
        <!--<el-input type="textarea" v-model="ruleForm.desc"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>-->
        <!--<el-button @click="resetForm('ruleForm')">重置</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <!--<el-upload class="avatar-uploader el-upload"-->
               <!--:action="uploadUrl"-->
               <!--:show-file-list="false"-->
               <!--accept=".mp4,.avi,.mkv,.ogg,.rmvb,.flv,.wmv"-->
               <!--:on-success="handleVideoSuccess"-->
               <!--:before-upload="beforeUploadVideo"-->
               <!--:on-progress="uploadVideoProcess">-->
      <!--&lt;!&ndash;<video v-if="this.global.company.showVideoPath !='' && !videoFlag"-->
             <!--this.global.company.showVideoPath-->
             <!--:src="this.global.company.showVideoPath"-->
             <!--class="avatar video-avatar"-->
             <!--controls="controls">您的浏览器不支持视频播放</video>-->
      <!--<i v-else-if="this.global.company.showVideoPath =='' && !videoFlag"-->
       <!--class="el-icon-plus avatar-uploader-icon"></i>&ndash;&gt;-->
    <!--<el-progress v-if="videoFlag == true"-->
                 <!--type="circle"-->
                 <!--:percentage="videoUploadPercent"-->
                 <!--style="margin-top:30px;"></el-progress>-->
    <!--<el-button class="video-btn"-->
               <!--slot="trigger"-->
               <!--size="small"-->
               <!--v-if="isShowUploadVideo"-->
               <!--type="primary">选取文件</el-button>-->
    <!--</el-upload>-->
    <!--<P v-if="isShowUploadVideo"-->
       <!--class="text">请保证视频格式正确，且不超过20M</P>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: false, message: '请填写描述', trigger: 'blur' }
        ]
      },
      uploadUrl: '', // 你要上传视频到你后台的地址
      videoFlag: false, // 是否显示进度条
      videoUploadPercent: '', // 进度条的进度，
      isShowUploadVideo: true // 显示上传按钮
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 上传前回调
    beforeUploadVideo (file) {
      const isLt20M = file.size / 1024 / 1024 < 20
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mkv'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt20M) {
        this.$message.error('上传视频大小不能超过20MB哦!')
        return false
      }
      this.isShowUploadVideo = false
    },
    // 进度条
    uploadVideoProcess (event, file, fileList) {
      this.videoFlag = true
      this.videoUploadPercent = file.percentage.toFixed(1) * 1
    },

    // 上传成功回调
    handleVideoSuccess (res, file) {
      this.isShowUploadVideo = true
      this.videoFlag = false
      this.videoUploadPercent = 0
      if (res.errorCode === '00') {
        // this.global.company.showVideoPath = res.sprbody.urlAddress
        // this.videoForm.showVideoPath = res.data.uploadUrl
      } else {
        this.$message.error('视频上传失败，请重新上传！')
      }
    }
  }
}
</script>
<style>
  #releaseVideo{
    margin:0 auto;
    height:700px;
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .video-avatar {
    width: 400px;
    height: 200px;
  }
</style>
