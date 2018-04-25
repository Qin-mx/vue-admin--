<template>
    <div class="components-container">
        <el-row :gutter="20">
            <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                    <code>图片hover效果</code>
                    <PanThumb :image='avatar' width="100px" height="100px">
                        这是图片
                    </PanThumb>
                </el-card>
            </el-col>

            <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                    <code>文字huover效果</code>
                     <text-hover-effect  className='mallki-text' :text="context"></text-hover-effect>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                    <code>文字huover效果</code>
                     <Streamer :text="Streamer"></Streamer>
                </el-card>
            </el-col>
             <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                    <code>直接copy的指令</code>
                    <code><a href="https://segmentfault.com/a/1190000009762198#articleHeader14" target="_blank">copy地址</a></code>
                    <el-button v-waves type="primary">水波纹效果</el-button>
                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                    <code>输入样式 <a href="https://github.com/PanJiaChen/vue-element-admin/blob/master/src/components/MDinput/index.vue" target="_blank">copy来源</a></code>
                    <md-input icon="search" name="title" placeholder="输入地址" v-model="title" type="url">地址</md-input>
                </el-card>
            </el-col>

            <el-col :sm="24" :lg="12">
                <el-card class="box-card">
                     <code>上传头像</code>
                    <div class="crop-demo">
                        <img :src="cropImg" class="pre-img">
                        <div class="crop-demo-btn" @click="uploadImg">选择图片
                            <input ref="imgcrop" class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                        </div>
                    </div>
                    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                        <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage" style="width:100%;height:300px;"></vue-cropper>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancelCrop">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                 </el-card>
            </el-col>
        </el-row>
        
    </div>
</template>
<script>
import PanThumb from '@/components/PanThumb'
import TextHoverEffect from '@/components/TextHoverEffect'
import Streamer from '@/components/Streamer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import MdInput from '@/components/MaterialInput'
import { mapGetters } from 'vuex'
import VueCropper from 'vue-cropperjs' // 裁图片
export default {
  name: 'other',
  components: {
    PanThumb,
    TextHoverEffect,
    Streamer,
    MdInput,
    VueCropper
  },
  directives: {
    waves
  },
  computed: {
    ...mapGetters(['avatar'])
  },
  data() {
    return {
      context: '这是hover文字效果',
      Streamer: '流光字体',
      title: '',
      cropImg: this.$store.getters.avatar,
      dialogVisible: false,
      imgSrc: ''
    }
  },
  methods: {
    uploadImg() {
      this.$refs.imgcrop.value = ''
    },
    setImage(e) {
      const file = e.target.files[0]
      if (!file.type.includes('image/')) {
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        this.imgSrc = event.target.result
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result)
        this.dialogVisible = true
      }
      reader.readAsDataURL(file)
    },
    cropImage() {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL()
    },
    cancelCrop() {
      this.dialogVisible = false
      this.cropImg = this.$store.getters.avatar
    },
    imageuploaded(res) {
      console.log(res)
    },
    handleError() {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box-card{
    margin-bottom: 10px;
    height: 250px;
}
 .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    .pre-img{
        width: 100px;
        height: 100px;
    }
</style>    

